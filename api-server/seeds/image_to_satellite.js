/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('image_to_satellite').del()
  await knex('image_to_satellite').insert([
    {image_id: 1, 
      satellite_id: 1},
    {image_id: 2, 
      satellite_id: 2},
    {image_id: 3, 
      satellite_id: 3}
  ]);
};
