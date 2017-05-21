const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('router', () => {
  describe('#POST auth/signup', (done) => {
    request(app)
      .post('auth/signup')
      .send({
        displayName: 'Mali Michael',
        username: 'malimichael',
        email: 'mali1@tunebay.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('ok');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  describe('#GET /users', () => {
    it('Returns an array of all users', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.users).to.be.an('array');
          done();
        });
    });
  });
});
