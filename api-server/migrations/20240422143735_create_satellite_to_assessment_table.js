/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('satellite_to_assessment', table => {
    table.increments('id')
    table.integer('satellite_id')
    table.foreign('satellite_id').references('satellite.id')
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
  .alterTable('satellite_to_assessment', table => {
    table.dropForeign('satellite_id');
    table.dropForeign('assessment_id');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('satellite_to_assessment')
  })
};
