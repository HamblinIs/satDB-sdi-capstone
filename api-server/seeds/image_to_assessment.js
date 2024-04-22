/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('image_to_assessment').del()
  await knex('image_to_assessment').insert([
    {image_id: 1, assessment_id: 1},
    {image_id: 2, assessment_id: 2},
    {image_id: 3, assessment_id: 3}
  ]);
};
