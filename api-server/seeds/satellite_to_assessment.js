/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('satellite_to_assessment').del()
  await knex('satellite_to_assessment').insert([
    {satellite_id: 1,
    assessment_id: 1}
  ]);
};
