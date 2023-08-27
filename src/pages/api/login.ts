import { knex } from "@/db";
import type { NextApiRequest, NextApiResponse } from 'next'
import bc from 'bcrypt'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end()
        }

        const user = await knex('users')
            .where('email', req.body.email)
            .first()

        if (!user) return res.json({
            error: true,
            msg: 'Usário ou senha não encontrado.'
        })

        const resul = await bc.compare(req.body.password, user.password);

        if (resul) return res.json({
            error: false,
            msg: 'Login realizado com sucesso.',
            user
        });

        return res.json({ status: false });
    } catch (error: any) {
        console.log(error)
        return res.json({ status: false });
    }
};