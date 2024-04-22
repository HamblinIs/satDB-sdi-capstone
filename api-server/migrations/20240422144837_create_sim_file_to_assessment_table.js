/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sim_file_to_assessment', table => {
        table.increments('id');
        table.integer('sim_file_id');
        table.foreign('sim_file_id').references('id').inTable('sim_file');
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
    .alterTable('sim_file_to_assessment', table => {
      table.dropForeign('sim_file_id');
      table.dropForeign('assessment_id');
    })
    .then(() => {
      return knex.schema.dropTableIfExists('sim_file_to_assessment')
    })
};
