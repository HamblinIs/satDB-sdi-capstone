// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */



module.exports = {

  development: {
    client: 'pg',
    connection:
      'postgres://postgres:docker@127.0.0.1:5432/assessment_database'
  },

  localhost: {
    client: "pg",
    connection: "postgres://postgres:docker@db:5432/assessment_database"

  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
