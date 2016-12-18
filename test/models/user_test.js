/* eslint no-unused-expressions: 0 */
const expect = require('chai').expect;
const User = require('../../models/user');

describe('User', () => {
  it('instantiates a user object', () => {
    const user = new User({
      displayName: 'Mali Michael',
      username: 'malimichael',
      email: 'mali@tunebay.com',
      password: 'password',
      accountType: 'artist'
    });
    expect(user.username).to.equal('malimichael');
    expect(user.id).to.not.exist;
  });

  it('saves a user to the database', (done) => {
    const user = new User({
      displayName: 'Mali Michael',
      username: 'malimichael',
      email: 'mali@tunebay.com',
      password: 'password',
      accountType: 'artist'
    });
    user.save()
      .then((res) => {
        expect(res.id).to.equal(1);
        done();
      });
  });
});