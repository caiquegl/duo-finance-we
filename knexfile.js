// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: "ep-jolly-violet-93063710.us-east-2.aws.neon.tech",
      database: 'duoFinance',
      user: 'caique.lima',
      password: 'ZwRrS1touN7Q',
      ssl: true
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'duoFinance',
      user: 'caique.lima',
      password: 'ZwRrS1touN7Q'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'duoFinance',
      user: 'caique.lima',
      password: 'ZwRrS1touN7Q'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};


