import { knex } from "@/db";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GetExits(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end()
        }

        const organization = req.cookies["nextAuth.duoFinanceOrganization"]
            ? JSON.parse(req.cookies["nextAuth.duoFinanceOrganization"])
            : {};

        const markets = await knex('markets')
            .select(
                'markets.id',
                'markets.date',
                'markets.market',
                'markets.total',
                'markets.type',
                'markets.type_payment',
                'markets.credit_cards_id',
                'credit_cards.name as credit_card_name'
            )
            .leftJoin('credit_cards', 'credit_cards.id', 'markets.credit_cards_id')
            .where('markets.organization_id', organization.id)
            .where('markets.type', req.body.type)
            .whereBetween('markets.date', req.body.date)
            .orderBy('markets.id', 'desc');

        const marketIds = markets.map((item: any) => item.id);

        const [categories, transactions, products] = await Promise.all([
            knex('products')
                .select(
                    'products.market_id',
                    'categories.name as category_name'
                )
                .leftJoin('categories', 'categories.id', 'products.category_id')
                .whereIn('products.market_id', marketIds),

            knex('products')
                .select(
                    'market_id',
                    knex.raw('COUNT(*) as count')
                )
                .whereIn('market_id', marketIds)
                .groupBy('market_id'),

            knex('products')
                .select(
                    'market_id',
                    'products.name as name',
                    'products.value as value',
                    'products.qtd as qtd',
                    'categories.name as category_name'
                )
                .leftJoin('categories', 'categories.id', 'products.category_id')
                .whereIn('products.market_id', marketIds)
        ]);

        const marketIdToCategory: any = {};
        const marketIdToTransactionCount: any = {};
        const marketIdToProducts: any = {};

        categories.forEach((category: any) => {
            marketIdToCategory[category.market_id] = category.category_name;
        });

        transactions.forEach((transaction: any) => {
            marketIdToTransactionCount[transaction.market_id] = transaction.count;
        });

        products.forEach((product: any) => {
            if (!marketIdToProducts[product.market_id]) {
                marketIdToProducts[product.market_id] = [];
            }

            marketIdToProducts[product.market_id].push({
                value: product.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                qtd: product.qtd,
                name: product.name,
                category: product.category_name,
            });
        });

        const send = markets.map((item: any) => ({
            key: item.id,
            date: moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
            payment: item.credit_card_id ? item.credit_card_name : item.type_payment,
            name: item.market,
            category: marketIdToCategory[item.id] || '',
            transaction: marketIdToTransactionCount[item.id] || 0,
            type: item.type,
            value: item.total,
            expand: marketIdToProducts[item.id] || [],
        }));

        return res.json({ error: false, exits: send });

    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, msg: error });
    }
};