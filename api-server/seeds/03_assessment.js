/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('assessment').del()
  await knex('assessment').insert([
    {name: 'ASCENT Assessment', description: 'This assessment analyzes the Visual Magnitude over time of the ASCENT satellite during June 12 - 13 2024.',
    creation_date: '2024-03-12'},
    {name: '	Rossi Assessment', description: 'This assessment analyzes X-ray astronomy',
    creation_date: '2024-01-03'},
    {name: 'Hubble', description: 'This assessment analyzes the expanding universe.',
    creation_date: '2024-02-10'}
  ]);
};

