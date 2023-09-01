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

        await knex('categories').insert({
            ...req.body,
            user_id: user.id,
            organization_id: organization.id,
        })

        return res.json({ error: false });

    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};