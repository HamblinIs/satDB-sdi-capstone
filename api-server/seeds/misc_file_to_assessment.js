/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('misc_file_to_assessment').del()
  await knex('misc_file_to_assessment').insert([
    {misc_file_id: 1, assessment_id: 1},
    // {misc_file_id: 1, assessment_id: 1},
    // {misc_file_id: 1, assessment_id: 1},
  ]);
};
