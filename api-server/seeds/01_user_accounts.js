/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_accounts').del()
  await knex('user_accounts').insert([
    {first_name: 'Isaac', last_name: 'Hamblin', password: bcrypt.hashSync("Password123", saltRounds), email: 'ihamblin@yahoo.com'},
    {first_name: 'Liz', last_name: 'Henry', password: bcrypt.hashSync("Password123", saltRounds), email: 'lhenry@myspace.com'},
    {first_name: 'Jamiel', last_name: 'Trimble', password: bcrypt.hashSync("Password123", saltRounds), email: 'jtrimble@aol.com'},
    {first_name: 'Avery', last_name: 'Evans', password: bcrypt.hashSync("Password123", saltRounds), email: 'aevans@clubpenguin.com'},
    {first_name: 'Conan', last_name: 'Shannahan', password: bcrypt.hashSync("Password123", saltRounds), email: 'cshannahan@webkinz.com'}
  ]);
};
