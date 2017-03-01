/* eslint no-unused-expressions: 0 */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Playlist controller', () => {
  describe('POST /playlists/new', () => {
    it('Creates a new playlist', (done) => {
      request(app)
        .post('/playlists/new')
        .send({
          title: 'Alchemy',
          playlistType: 'album',
          userId: 1,
          numberOfTracks: 12,
          price: 6.99,
          canPayMore: true,
          lengthInSeconds: 3480,
          genre1Id: 29,
          genre2Id: 13,
          description: 'My debut album for sales exclusively on Tunebay',
          releaseDate: '13/12/2016'
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('ok');
          expect(res.body).to.have.property('id');
          done();
        });
    });
  });
});
