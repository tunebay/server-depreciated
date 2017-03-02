const db = require('../database/config').db;
const sql = require('../database/config').sql;

const clearData = sql('./queries/test/truncate_tables.sql');

if (process.env.NODE_ENV === 'test') {
  beforeEach((done) => {
    db.none(clearData)
      .then(() => {
        done();
      });
  });
}
