const promise = require('bluebird');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: `tunebay_${environment}`,
  user: 'Mali'
});

const sql = (file) => {
  return new pgp.QueryFile(path.join(__dirname, file), { minify: true });
};

module.exports = {
  db, sql
};
