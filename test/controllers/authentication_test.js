/* eslint no-unused-expressions: 0 */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Authentication controller', () => {
  describe('POST /signup', () => {
    it('Creates new user', (done) => {
      request(app)
        .post('/signup')
        .send({
          displayName: 'Mali Michael',
          username: 'malimichael',
          email: 'mali@tunebay.com',
          password: 'password',
          accountType: 'artist'
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Successfully created a user.');
          done();
        });
    });

    xit('responds with an error if email is in use', (done) => {
      done();
    });

    xit('reponds with an error if username is in use', (done) => {
      done();
    });
  });
});
