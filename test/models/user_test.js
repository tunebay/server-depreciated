/* eslint no-unused-expressions: 0 */
const expect = require('chai').expect;
const User = require('../../models/user');

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User({
      displayName: 'Mali Michael',
      username: 'malimichael',
      email: 'mali@tunebay.com',
      password: 'password',
      accountType: 'artist'
    });
  });

  it('instantiates a user object', () => {
    expect(user.username).to.equal('malimichael');
    expect(user.email).to.equal('mali@tunebay.com');
    expect(user.id).to.not.exist;
  });

  describe('#save', () => {
    it('saves a user to the database', (done) => {
      user.save()
        .then((res) => {
          expect(res.id).to.equal(1);
          done();
        });
    });

    it('returns the saved user object on resolve', (done) => {
      user.save()
        .then((res) => {
          expect(res).to.have.property('display_name');
          expect(res.display_name).to.equal('Mali Michael');
          done();
        });
    });

    it('Encrypts a users password on saving', (done) => {
      user.save()
        .then((res) => {
          expect(res.password_hash).to.not.equal('password');
          done();
        });
    });

    it('does not save a user with an in use email', (done) => {
      const imposter = new User({
        displayName: 'Imposter Michael',
        username: 'impostermichael',
        email: 'mali@tunebay.com',
        password: 'password',
        accountType: 'artist'
      });
      user.save()
        .then(() => {
          imposter.save()
            .catch((err) => {
              expect(err.detail).to.equal('Key (email)=(mali@tunebay.com) already exists.');
              done();
            });
        });
    });
  });

  describe('.findBy*', () => {
    beforeEach((done) => {
      user.save().then(() => done());
    });

    it('Can find a user by username', (done) => {
      User.findByUsername('malimichael')
        .then((res) => {
          expect(res.email).to.equal('mali@tunebay.com');
          done();
        });
    });

    it('Can find a user by email', (done) => {
      User.findByEmail('mali@tunebay.com')
        .then((res) => {
          expect(res.email).to.equal('mali@tunebay.com');
          done();
        });
    });

    it('Can find a user by id', (done) => {
      User.findById(1)
        .then((res) => {
          expect(res.email).to.equal('mali@tunebay.com');
          done();
        });
    });
  });
});
