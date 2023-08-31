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

        const market = await knex('markets').insert({
            date: moment(req.body.date).format('YYYY-MM-DD'),
            market: req.body.market,
            total: req.body.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
            type: 'entry',
            user_id: user.id,
            organization_id: organization.id,
        }).returning("id")

        await knex('products').insert({
            name: req.body.market,
            qtd: 1,
            value: req.body.total,
            market_id: market[0].id,
            category_id: req.body.category_id,
            user_id: user.id,
            organization_id: organization.id,
        })

        return res.json({ error: false });

    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};