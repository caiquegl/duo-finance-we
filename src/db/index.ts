export const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.host,
        database: process.env.database,
        user: process.env.user,
        password: process.env.password,
        ssl: true
    },
});