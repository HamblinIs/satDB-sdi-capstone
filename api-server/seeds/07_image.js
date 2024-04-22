/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('image').del()
  await knex('image').insert([
    {file_path_name: 'S:assessments/COAST_Files/output.png'}
  ]);
};
