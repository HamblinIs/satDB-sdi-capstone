/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('misc_file').del()
  await knex('misc_file').insert([
    {file_path_name: '/misc_file/satellite_path_file.wat'},
    {file_path_name: '/misc_file/orbital_tracking_file.wat'},
    {file_path_name: '/misc_file/OOH_health_data.wat'},
  ]);
};
