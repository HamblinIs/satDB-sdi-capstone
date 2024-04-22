/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sim_file').del()
  await knex('sim_file').insert([
    {file_path_name: 'S:assessments/COAST_Files/my_sim_file.xml'},
    {file_path_name: 'file_path_2'},
    {file_path_name: 'the 3rd sim file'}
  ]);
};
