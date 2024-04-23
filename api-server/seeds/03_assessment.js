/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('assessment').del()
  await knex('assessment').insert([
    {
      name: 'ASCENT Assessment',
      description: 'This assessment analyzes the Visual Magnitude over time of the ASCENT satellite during June 12 - 13 2024.',
      creation_date: '2024-03-12'
    },

    {
      name: 'Rossi Assessment',
      description: 'This assessment analyzes X-ray astronomy.',
      creation_date: '2024-01-03'
    },

    {
      name: 'Hubble Assessment',
      description: 'This assessment analyzes the expanding universe.',
      creation_date: '2024-02-10'
    },

    {
      name: 'Kepler Assessment',
      description: 'This assessment analyzes the exoplanets discovered by the Kepler satellite.',
      creation_date: '2023-04-15'
    },

    {
      name: 'Galileo Assessment',
      description: 'This assessment analyzes the positioning data from the Galileo satellite navigation system.',
      creation_date: '2023-05-20'
    },

    {
      name: 'Voyager Assessment',
      description: 'This assessment analyzes the data from the Voyager interstellar mission.',
      creation_date: '2023-06-25'
    },

    {
      name: 'Cassini Assessment',
      description: 'This assessment analyzes the data from the Cassini mission to Saturn.',
      creation_date: '2023-07-30'
    },

    {
      name: 'Juno Assessment',
      description: 'This assessment analyzes the data from the Juno mission to Jupiter.',
      creation_date: '2023-08-04'
    },

    {
      name: 'Parker Solar Probe Assessment',
      description: 'This assessment analyzes the data from the Parker Solar Probe mission to the Sun.',
      creation_date: '2023-09-09'
    },

    {
      name: 'Chandra Assessment',
      description: 'This assessment analyzes the X-ray data from the Chandra X-ray Observatory.',
      creation_date: '2023-10-14'
    }

  ]);
};

