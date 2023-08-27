import { knex } from "@/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GetCreditCards(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end()
        }

        let organization: any = {}
        if (req.cookies["nextAuth.duoFinanceOrganization"]) organization = JSON.parse(req.cookies["nextAuth.duoFinanceOrganization"])

        const categ = await knex('categories')
            .select(
                'categories.name as label',
                'categories.id as value',
            )
            .where('categories.organization_id', organization.id)
            .orderBy('categories.id', 'desc')

        return res.json({ error: false, categ });
    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};