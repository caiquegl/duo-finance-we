import { knex } from "@/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GetCreditCards(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end()
        }

        let organization: any = {}
        if (req.cookies["nextAuth.duoFinanceOrganization"]) organization = JSON.parse(req.cookies["nextAuth.duoFinanceOrganization"])

        const cards = await knex('credit_cards')
            .select(
                'credit_cards.name as label',
                'credit_cards.id as value',
            )
            .where('credit_cards.organization_id', organization.id)
            .orderBy('credit_cards.id', 'desc')

        return res.json({ error: false, cards });
    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};