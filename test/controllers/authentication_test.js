/* eslint no-unused-expressions: 0 */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Authentication controller', () => {
  it('POST to /signup creates new user', (done) => {
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
});
