const db = require('../database/config').db;

if (process.env.NODE_ENV === 'test') {
  beforeEach((done) => {
    db.none('TRUNCATE TABLE users RESTART IDENTITY')
      .then(() => {
        done();
      });
  });
}
