import { knex } from "@/db";
import type { NextApiRequest, NextApiResponse } from 'next'
import market from '../../../products.json'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {

        // for await (const item of market) {
        //     await knex('products')
        //         .insert({
        //             id: item.id,
        //             name: item.name,
        //             qtd: item.qtd,
        //             value: item.value,
        //             user_id: item.user_id,
        //             organization_id: item.organization_id,
        //             market_id: item.market_id,
        //             category_id: item.category_id,

        //         })
        // }

        return res.json({ status: true });
    } catch (error: any) {
        console.log(error)
        return res.json({ status: false });
    }
};