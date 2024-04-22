/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('data_file_to_assessment', table => {
        table.increments('id');
        table.integer('data_file_id');
        table.foreign('data_file_id').references('id').inTable('data_file');
        table.integer('assessment_id');
        table.foreign('assessment_id').references('id').inTable('assessment');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable('data_file_to_assessment', table => {
      table.dropForeign('data_file_id');
      table.dropForeign('assessment_id');
    })
    .then(() => {
      return knex.schema.dropTableIfExists('data_file_to_assessment')
    })
};
