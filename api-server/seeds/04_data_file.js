/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('data_file').del()
  await knex('data_file').insert([
    {file_path_name: 'this is just a test'},
    // {file_path_name: 'rowValue1'},
    // {file_path_name: 'rowValue1'},
  ]);
};
