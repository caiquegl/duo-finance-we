import { knex } from "@/db";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GetExits(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end()
        }

        let user: any = {}
        if (req.cookies["nextAuth.duoFinance"]) user = JSON.parse(req.cookies["nextAuth.duoFinance"])

        let organization: any = {}
        if (req.cookies["nextAuth.duoFinanceOrganization"]) organization = JSON.parse(req.cookies["nextAuth.duoFinanceOrganization"])

        let totalValue = req.body.products.reduce((accumulator: any, currentValue: any) => {
            return accumulator + parseFloat(currentValue.value);
        }, 0);

        const criarArrayComPosicoes = (numeroDePosicoes: number) => {
            if (numeroDePosicoes <= 0) {
                return []; // Retorna um array vazio se o número de posições for menor ou igual a zero
            }

            return Array.from({ length: numeroDePosicoes }, (_, index) => index + 1);
        }

        const parcelament = req.body.parcelament

        if (parcelament && parcelament > 1) {
            totalValue = totalValue / parcelament
        }

        const market = await knex('markets').insert({
            date: moment(req.body.date).format('YYYY-MM-DD'),
            market: `${req.body.market}${parcelament && parcelament > 1 ? ` 1/${parcelament}` : ''}`,
            total: totalValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
            type: 'exit',
            type_payment: req.body.type_payment,
            user_id: user.id,
            organization_id: organization.id,
            credit_cards_id: req.body.type_payment == 'Crédito' ? req.body.credit_cards_id : null,
            parcelament: parcelament || null,
            initial_market_id: null
        }).returning("id")

        if (parcelament && parcelament > 1) {
            for await (const [index, item] of criarArrayComPosicoes(parcelament - 1).entries()) {
                await knex('markets').insert({
                    date: moment(req.body.date).add('M', index + 1).format('YYYY-MM-DD'),
                    market: `${req.body.market}${` ${index + 2}/${parcelament}`}`,
                    total: totalValue.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }),
                    type: 'exit',
                    type_payment: req.body.type_payment,
                    user_id: user.id,
                    organization_id: organization.id,
                    credit_cards_id: req.body.type_payment == 'Crédito' ? req.body.credit_cards_id : null,
                    parcelament: parcelament || null,
                    initial_market_id: market[0].id
                })
            }
        }

        console.log(market)

        for await (const item of req.body.products) {
            await knex('products').insert({
                name: item.name,
                qtd: item.qtd,
                value: item.value,
                market_id: market[0].id,
                category_id: item.category,
                user_id: user.id,
                organization_id: organization.id,
            })
        }


        return res.json({ error: false });

    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};