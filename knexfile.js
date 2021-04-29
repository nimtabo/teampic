// // Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {

      database: 'cohort_db'

    },


    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: { directory: __dirname + '/db/seeds' },

  }

};
