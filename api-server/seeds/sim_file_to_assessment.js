/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sim_file_to_assessment').del()
  await knex('sim_file_to_assessment').insert([
    {sim_file_id: 1, 
      assessment_id: 1},
    {sim_file_id: 2, 
      assessment_id: 2},
    {sim_file_id: 3, 
      assessment_id: 3}
    
  ]);
};
