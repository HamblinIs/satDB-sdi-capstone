/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('assessment_to_user_account').del()
  await knex('assessment_to_user_account').insert([
    {assessment_id: 1, user_account_id: 1}
  ]);
};
