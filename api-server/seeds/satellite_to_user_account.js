/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('satellite_to_user_account').del()
  await knex('satellite_to_user_account').insert([
    {satellite_id: 1, user_account_id: 1},
    {satellite_id: 2, user_account_id: 2},
    {satellite_id: 3, user_account_id: 3}
  ]);
};
