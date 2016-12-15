const promise = require('bluebird');

const environment = process.env.NODE_ENV || 'development';
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);

module.exports = pgp({
  host: 'localhost',
  port: 5432,
  database: `tunebay_${environment}`,
  user: 'Mali'
});
