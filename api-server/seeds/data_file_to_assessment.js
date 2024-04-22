/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('data_file_to_assessment').del()
  await knex('data_file_to_assessment').insert([
    {data_file_id: 1, assessment_id: 1}
  ]);
};
