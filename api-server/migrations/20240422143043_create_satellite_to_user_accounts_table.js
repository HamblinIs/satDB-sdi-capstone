/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('satellite_to_user_account', table => {
    table.increments('id')
    table.integer('satellite_id')
    table.foreign('satellite_id').references('satellite.id')
    table.integer('user_account_id')
    table.foreign('user_account_id').references('user_accounts.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .alterTable('satellite_to_user_account', table => {
    table.dropForeign('satellite_id');
    table.dropForeign('user_account_id');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('satellite_to_user_account')
  })
};
