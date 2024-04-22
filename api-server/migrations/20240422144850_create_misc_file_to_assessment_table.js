/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('misc_file_to_assessment', table => {
    table.increments('id')
    table.integer('misc_file_id')
    table.foreign('misc_file_id').references('misc_file.id')
    table.integer('assessment_id')
    table.foreign('assessment_id').references('assessment.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .alterTable('misc_file_to_assessment', table => {
    table.dropForeign('misc_file_id');
    table.dropForeign('assessment_id');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('misc_file_to_assessment')
  })
};
