/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('misc_file').del()
  await knex('misc_file').insert([
    {file_path_name: 'bring back vine'},
    {file_path_name: 'checking for misc file'},
    {file_path_name: 'more misc'},
  ]);
};
