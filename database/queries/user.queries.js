const knex = require('../knex');

const Users = () => {
  return knex('users');
};

// ==== Queries ==== //

const getAll = () => {
  return Users().select('*');
};

const findById = (userId) => {
  return Users().where('id', parseInt(userId)).first();
};

const findByUsername = (username) => {
  return Users().where('username', username).first();
};

const findByEmail = (email) => {
  return Users().where('email', email).first();
};

module.exports = {
  getAll,
  findById,
  findByUsername,
  findByEmail
};
