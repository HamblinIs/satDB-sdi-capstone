/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('cad_model').del()
  await knex('cad_model').insert([
    {file_path_name: '/cad_model/demo_file.cad'},
    {file_path_name: '/cad_model/example_file.cad'},
    {file_path_name: '/cad_model/demonstration.cad'}
  ]);
};
