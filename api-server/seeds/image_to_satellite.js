/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('image_to_satellite').del()
  await knex('image_to_satellite').insert([
    {image_id: 1,
    satellite_id: 1}
  ]);
};
