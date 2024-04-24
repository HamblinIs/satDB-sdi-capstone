/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('data_file').del()
  await knex('data_file').insert([
    {file_path_name: '/data_file/data file 0.dat'},
    {file_path_name: '/data_file/additional data.dat'},
    {file_path_name: '/data_file/even more data.dat'}
  ]);
};
