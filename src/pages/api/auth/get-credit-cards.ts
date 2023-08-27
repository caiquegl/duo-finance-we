import { knex } from "@/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GetCreditCards(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end()
        }

        let user: any = {}
        if (req.cookies["nextAuth.duoFinance"]) user = JSON.parse(req.cookies["nextAuth.duoFinance"])

        let organization: any = {}
        if (req.cookies["nextAuth.duoFinanceOrganization"]) organization = JSON.parse(req.cookies["nextAuth.duoFinanceOrganization"])

        const creditCards = await knex('credit_cards')
            .select(
                knex.raw('count(markets.id) as transactions'),
                knex.raw('sum(products.value) as couts'),
                'credit_cards.name as name',
                'credit_cards.date_close as venc',
                'credit_cards.icon as picture'
            )
            .leftJoin('markets', 'markets.credit_cards_id', 'credit_cards.id')
            .leftJoin('products', 'products.market_id', 'markets.id')
            .where('credit_cards.organization_id', organization.id)
            .whereBetween('markets.date', req.body.date)
            .groupBy(
                'credit_cards.name',
                'credit_cards.date_close',
                'credit_cards.icon',
                'credit_cards.id'
            )
            .orderBy('credit_cards.id', 'asc')

        return res.json({ error: false, creditCards });
    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};