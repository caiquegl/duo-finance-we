import { knex } from "@/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function listOrganizacao(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end()
        }
        let user: any = {}
        if (req.cookies["nextAuth.duoFinance"]) user = JSON.parse(req.cookies["nextAuth.duoFinance"])

        const organizations = await knex('organizations')
            .select('organizations.*')
            .leftJoin('users_organization', 'users_organization.organization_id', 'organizations.id')
            .where('users_organization.user_id', user.id)

        return res.json({ error: false, organizations });
    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};