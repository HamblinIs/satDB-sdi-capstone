/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cad_model_to_satellite', table => {
    table.increments('id')
    table.integer('cad_model_id')
    table.foreign('cad_model_id').references('cad_model.id')
    table.integer('satellite_id')
    table.foreign('satellite_id').references('satellite.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('cad_model_to_satellite', table => {
      table.dropForeign('cad_model_id');
      table.dropForeign('satellite_id');
    })
    .then(() => {
      return knex.schema.dropTableIfExists('cad_model_to_satellite')
    })
};
