/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cad_model_to_satellite').del()
  await knex('cad_model_to_satellite').insert([
    {cad_model_id: 1,
    satellite_id: 1}
  ]);
};
