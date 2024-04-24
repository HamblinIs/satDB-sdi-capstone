/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('satellite').del()
  await knex('satellite').insert([
    {orbit: 'LEO', owner: 'AFRL', name: 'ASCENT', tail_num: 17245},
    {orbit: 'LEO', owner: 'NASA', name: 'Rossi', tail_num: 65447},
    {orbit: 'LEO', owner: 'NASA ', name: 'Hubble', tail_num: 45345},
    {orbit: 'Heliocentric', owner: 'NASA', name: 'Kepler', tail_num: 33442},
    {orbit: 'MEO', owner: 'ESA', name: 'Galileo', tail_num: 37846},
    {orbit: 'Heliocentric', owner: 'NASA', name: 'Voyager', tail_num: 10271},
    {orbit: 'Heliocentric', owner: 'NASA', name: 'Cassini', tail_num: 25008},
    {orbit: 'Polar', owner: 'NASA', name: 'Juno', tail_num: 37773},
    {orbit: 'Heliocentric', owner: 'NASA', name: 'Parker Solar Probe', tail_num: 43603},
    {orbit: 'Highly elliptical', owner: 'NASA', name: 'Chandra', tail_num: 25867}

  ]);
};
