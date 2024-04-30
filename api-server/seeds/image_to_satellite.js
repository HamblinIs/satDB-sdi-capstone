/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('image_to_satellite').del()
  await knex('image_to_satellite').insert([
    // {image_id: 1, 
    //   satellite_id: 1},
    // {image_id: 2, 
    //   satellite_id: 2},
    // {image_id: 3, 
    //   satellite_id: 3},
    {
      image_id: 1,
      satellite_id: 1
    },
    {
      image_id: 2,
      satellite_id: 2
    },
    {
      image_id: 3,
      satellite_id: 3
    },
    {
      image_id: 4,
      satellite_id: 4
    },
    {
      image_id: 5,
      satellite_id: 5
    },
    {
      image_id: 6,
      satellite_id: 6
    },
    {
      image_id: 7,
      satellite_id: 7
    },
    {
      image_id: 8,
      satellite_id: 8
    },
    {
      image_id: 9,
      satellite_id: 9
    },
    {
      image_id: 10,
      satellite_id: 10
    },
  ]);
};
