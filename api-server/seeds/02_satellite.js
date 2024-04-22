/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('satellite').del()
  await knex('satellite').insert([
    {orbit: 'LEO', owner: 'AFRL', name: 'ASCENT', tail_num: 17245},
    {orbit: '???', owner: 'NASA', name: 'Rossi', tail_num: 65447},
    {orbit: 'LEO', owner: 'NASA ', name: 'Hubble', tail_num: 45345}

  ]);
};
