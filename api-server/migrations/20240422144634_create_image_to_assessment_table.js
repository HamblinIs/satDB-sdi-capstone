/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('image_to_assessment', table => {
        table.increments('id');
        table.integer('image_id');
        table.foreign('image_id').references('id').inTable('satellite');
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
    .alterTable('image_to_assessment', table => {
        table.dropForeign('assessment_id');
        table.dropForeign('image_id');
    })
    .then(() => {
        return knex.schema.dropTableIfExists('image_to_assessment')
    })
  
};
