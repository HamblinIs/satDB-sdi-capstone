/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('assessment_to_user_account', table => {
        table.increments('id');
        table.integer('assessment_id');
        table.foreign('assessment_id').references('id').inTable('assessment');
        table.integer('user_account_id');
        table.foreign('user_account_id').references('id').inTable('user_accounts');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable('assessment_to_user_account', table => {
      table.dropForeign('assessment_id');
      table.dropForeign('user_account_id');
    })
    .then(() => {
      return knex.schema.dropTableIfExists('assessment_to_user_account')
    })
};
