/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('satellite', table => {
        table.increments('id');
        table.string('orbit');
        table.string('owner');
        table.string('name');
        table.integer('tail_num');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('satellite');
};
