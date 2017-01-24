/* eslint no-unused-expressions: 0 */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Authentication controller', () => {
  describe('POST /signup', () => {
    it('Creates new user and returns a jwt token', (done) => {
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
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('responds with an error if username is in use', (done) => {
      request(app)
        .post('/signup')
        .send({
          displayName: 'Mali Michael',
          username: 'malimichael',
          email: 'mali@tunebay.com',
          password: 'password',
          accountType: 'artist'
        })
        .end(() => {
          request(app)
            .post('/signup')
            .send({
              displayName: 'Imposter Michael',
              username: 'malimichael',
              email: 'imposter@tunebay.com',
              password: 'password',
              accountType: 'artist'
            })
            .expect(200)
            .end((err, res) => {
              expect(res.body.error).to.equal('The username malimichael is not available.');
              done();
            });
        });
    });

    it('responds with an error if email is in use', (done) => {
      request(app)
        .post('/signup')
        .send({
          displayName: 'Mali Michael',
          username: 'malimichael',
          email: 'mali@tunebay.com',
          password: 'password',
          accountType: 'artist'
        })
        .end(() => {
          request(app)
            .post('/signup')
            .send({
              displayName: 'Imposter Michael',
              username: 'imposter',
              email: 'mali@tunebay.com',
              password: 'password',
              accountType: 'artist'
            })
            .expect(200)
            .end((err, res) => {
              expect(res.body.error).to.equal('This email is already in use.');
              done();
            });
        });
    });
  });

  describe('POST /login', () => {
    beforeEach((done) => {
      request(app)
        .post('/signup')
        .send({
          displayName: 'Mali Michael',
          username: 'malimichael',
          email: 'mali@tunebay.com',
          password: 'password',
          accountType: 'artist'
        })
        .end(() => done());
    });

    it('Can successfully login a user with valid credentials', (done) => {
      request(app)
        .post('/login')
        .send({
          emailOrUsername: 'mali@tunebay.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('ok');
          done();
        });
    });

    it('Denies entry to user with invalid credentials', (done) => {
      request(app)
        .post('/login')
        .send({
          emailOrUsername: 'mali@tunebay.com',
          password: 'badpassword'
        })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Unauthorized');
          return done();
        });
    });

    it('allows for login with username', (done) => {
      request(app)
        .post('/login')
        .send({
          emailOrUsername: 'malimichael',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('ok');
          done();
        });
    });
  });
});
