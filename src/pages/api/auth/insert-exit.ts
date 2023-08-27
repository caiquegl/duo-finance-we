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

        const totalValue = req.body.products.reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue.value;
        }, 0);

        const market = await knex('markets').insert({
            date: moment(req.body.date).format('YYYY-MM-DD'),
            market: req.body.market,
            total: totalValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
            type: 'exit',
            type_payment: req.body.type_payment,
            user_id: user.id,
            organization_id: organization.id,
            credit_cards_id: req.body.type_payment == 'Crédito' ? req.body.credit_cards_id : null
        }).returning("id")

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