import { knex } from "@/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GetCreditCards(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end()
        }
        const body = req.body

        let organization: any = {}
        if (req.cookies["nextAuth.duoFinanceOrganization"]) organization = JSON.parse(req.cookies["nextAuth.duoFinanceOrganization"])

        const search = body.search
        const table = body.table

        const rows = await knex(table)
            .select('id AS value', 'name AS label')
            .where('categories.organization_id', organization.id)
            .andWhere(knex.raw(
                `trim(name) ILIKE trim('%${search}%')`
            ))

        return res.json(rows)

    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};