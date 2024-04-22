/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('satellite').del()
  await knex('satellite').insert([
    {orbit: 'LEO', owner: 'AFRL', name: 'ASCENT', tail_num: 17245},
    // {orbit: 'rowValue1', owner: '', name: '', tail_num: ''},
    // {orbit: 'rowValue1', owner: '', name: '', tail_num: ''}
  ]);
};
