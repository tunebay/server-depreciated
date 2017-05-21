// const db = require('../database/config').db;
// const sql = require('../database/config').sql;
const knex = require('../database/knex');
const Promise = require('bluebird');
// const clearData = sql('./queries/test/truncate_tables.sql');

const tables = [
  'users'
];

if (process.env.NODE_ENV === 'test') {
  beforeEach(() => {
    return Promise.each(tables, (t) => {
      return knex.raw(`TRUNCATE TABLE ${t} RESTART IDENTITY CASCADE`);
    });
  });

  afterEach(() => {
    return Promise.each(tables, (t) => {
      return knex.raw(`TRUNCATE TABLE ${t} RESTART IDENTITY CASCADE`);
    });
  });
}
