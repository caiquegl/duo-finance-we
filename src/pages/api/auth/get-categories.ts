import { knex } from "@/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GetCreditCards(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end()
        }

        let organization: any = {}
        if (req.cookies["nextAuth.duoFinanceOrganization"]) organization = JSON.parse(req.cookies["nextAuth.duoFinanceOrganization"])

        const categ = await knex('categories as c')
            .select(
                'c.name as name',
                'c.id as id',
                'c.id as key',
                'c.is_primary as is_primary',
                'c.sub_category as sub_category',
                knex.raw('(SELECT SUM(p.value * p.qtd) FROM products p WHERE p.category_id = c.id AND EXISTS (SELECT 1 FROM markets m WHERE m.id = p.market_id AND m.date BETWEEN ? AND ?)) as value_category', [req.body.date[0], req.body.date[1]])
            )
            .where('c.organization_id', organization.id)
            .where('c.is_primary', true)
            .groupBy('c.id')
            .orderBy('c.id', 'desc');


        let list: any = []

        for await (const item of categ) {

            const sub = await knex('categories')
                .select(
                    'categories.name as name',
                    'categories.id as id',
                    'categories.id as key',
                    'categories.is_primary as is_primary',
                    'categories.sub_category as sub_category',
                    knex.raw('(SELECT SUM(p.value * p.qtd) FROM products p WHERE p.category_id = categories.id AND EXISTS (SELECT 1 FROM markets m WHERE m.id = p.market_id AND m.date BETWEEN ? AND ?)) as value_category', [req.body.date[0], req.body.date[1]])
                )
                .where('categories.organization_id', organization.id)
                .where('categories.sub_category', item.id)
                .groupBy('categories.id')
                .orderBy('categories.id', 'desc');

            let value_total = item.value_category

            if (sub.length > 0) {
                let val = sub.reduce((prev: any, next: any) => prev + next.value_category, 0)
                value_total = value_total + val
            }

            list.push({
                ...item,
                value_total,
                expand: sub.map((item: any) => {
                    return {
                        ...item,
                        value_total,
                    }
                })
            })
        }

        const total = await knex('categories').where('categories.organization_id', organization.id)
            .count()
            .first()

        return res.json({ error: false, categories: list, total: total.count });
    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};