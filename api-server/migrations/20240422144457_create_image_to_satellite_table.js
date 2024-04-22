/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('image_to_satellite', table => {
        table.increments('id');
        table.integer('image_id');
        table.foreign('image_id').references('id').inTable('image');
        table.integer('satellite_id');
        table.foreign('satellite_id').references('id').inTable('satellite');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
  .alterTable('image_to_satellite', table => {
    table.dropForeign('satellite_id');
    table.dropForeign('image_id');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('image_to_satellite')
  })
};
