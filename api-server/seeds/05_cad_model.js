/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('cad_model').del()
  await knex('cad_model').insert([
    {file_path_name: 'I swear this is the 5th time weve made this'},
    {file_path_name: 'checking cad model'},
    {file_path_name: 'third times the charm'}
  ]);
};
