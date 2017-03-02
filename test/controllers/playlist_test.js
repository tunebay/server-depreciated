/* eslint no-unused-expressions: 0 */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Playlist controller', () => {
  describe('POST /playlists/new', () => {
    let token;
    beforeEach((done) => {
      request(app)
        .post('/signup')
        .send({
          displayName: 'Mali Michael',
          username: 'playlstcontrolertest',
          email: 'playlistcontrollertest@tunebay.com',
          password: 'password',
          accountType: 'artist'
        })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('Creates a new playlist', (done) => {
      request(app)
        .post('/playlists/new')
        .set('Authorization', token) // authorized request
        .send({
          title: 'Alchemy',
          playlistType: 'album',
          userId: 1,
          numberOfTracks: 12,
          price: 6.99,
          canPayMore: true,
          lengthInSeconds: 3480,
          genre1Id: 32,
          genre2Id: 14,
          description: 'My debut album for sales exclusively on Tunebay',
          releaseDate: '13/12/2016'
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('ok');
          expect(res.body).to.have.property('id');
          done();
        });
    });

    it('Doesnt allow Unauthorized requests', (done) => {
      request(app)
        .post('/playlists/new')
        // .set('Authorization', token) //  not authorized
        .send({
          title: 'Alchemy',
          playlistType: 'album',
          userId: 1,
          numberOfTracks: 12,
          price: 6.99,
          canPayMore: true,
          lengthInSeconds: 3480,
          genre1Id: 32,
          genre2Id: 14,
          description: 'My debut album for sales exclusively on Tunebay',
          releaseDate: '13/12/2016'
        })
        .end((err, res) => {
          expect(res.text).to.equal('Unauthorized');
          expect(res.body).not.to.have.property('id');
          done();
        });
    });
  });
});
