/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('image').del()
  await knex('image').insert([
    {file_path_name: 'S:assessments/COAST_Files/output.png'},
    {file_path_name: 'S:example 2.png'},
    {file_path_name: 'S:example 3.jpg'},
    {file_path_name: 'https://media.defense.gov/2022/Oct/17/2003097438/500/500/0/220717-F-F3963-1058.JPG'},
    {file_path_name: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Rxte.jpg/300px-Rxte.jpg'},
    {file_path_name: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/300px-HST-SM4.jpeg'},
    {file_path_name: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Kepler_Space_Telescope_spacecraft_model_2.png/300px-Kepler_Space_Telescope_spacecraft_model_2.png'},
    {file_path_name: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Galileo_satellite_model.jpg/220px-Galileo_satellite_model.jpg'},
    {file_path_name: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Voyager_spacecraft_model.png/260px-Voyager_spacecraft_model.png'},
    {file_path_name: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Cassini_Saturn_Orbit_Insertion.jpg/276px-Cassini_Saturn_Orbit_Insertion.jpg'},
    {file_path_name: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Juno_spacecraft_model_1.png/301px-Juno_spacecraft_model_1.png'},
    {file_path_name: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Parker_Solar_Probe_spacecraft_model.png/260px-Parker_Solar_Probe_spacecraft_model.png'},
    {file_path_name: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Chandra_artist_illustration.jpg/275px-Chandra_artist_illustration.jpg'}
  ]);
};
