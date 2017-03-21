const { db, sql } = require('../database/config');
const { getCurrentTimestamp } = require('../services/helpers');

// file paths relative to 'sql()' function in /database/config.js
const sqlCreatePlaylist = sql('./queries/playlist/createPlaylist.sql');
const sqlInsertGenres = sql('./queries/playlist/insertGenres.sql');
const sqlFindAllPlaylistsByUserId = sql('./queries/playlist/findAllByUserId.sql');

class Playlist {
  constructor(playlist, userId) {
    // required fields
    this.title = playlist.title;
    this.playlistType = playlist.playlistType;
    this.userId = userId;
    this.numberOfTracks = playlist.numberOfTracks;
    this.price = playlist.price;
    this.canPayMore = playlist.canPayMore;
    this.lengthInSeconds = playlist.lengthInSeconds;
    this.genre1Id = playlist.genre1Id;
    this.createdAt = getCurrentTimestamp();
    // unrequired fields
    this.genre2Id = playlist.genre2Id || null;
    this.genre3Id = playlist.genre3Id || null;
    this.description = playlist.description || null;
    this.releaseDate = playlist.releaseDate || null;
  }

  save() {
    return new Promise((resolve, reject) => {
      db.one(sqlCreatePlaylist, this)
        .then((data) => {
          const genreData = {
            playlistId: data.id,
            genre1Id: this.genre1Id,
            genre2Id: this.genre2Id,
            genre3Id: this.genre3Id
          };
          db.none(sqlInsertGenres, genreData)
            .then(() => {
              resolve(genreData.playlistId);
            }).catch(error => console.log('Save playlist err', error));
        })
        .catch((error) => {
          console.log('**SAVING PLAYLIST ERROR***', error);
          reject(error);
        });
    });
  }

  static findAllByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.any(sqlFindAllPlaylistsByUserId, [userId])
        .then((data) => {
          const playlists = [];

          data.forEach((record) => {
            const playlist = {
              id: record.id,
              title: record.title,
              playlistType: record.playlist_type,
              price: record.price,
              canPayMore: record.can_pay_more,
              numberOfTracks: record.number_of_tracks,
              duration: record.duration,
              description: record.description,
              releaseDate: record.release_date,
              createdAt: record.created_at
            };
            playlists.push(playlist);
          });

          resolve(playlists);
          console.log('PLAYLISTS DATA:', playlists);
        })
        .catch((err) => {
          console.log('**Find all playlists by id ERRROR**', err);
          reject(err);
        });
    });
  }
}

module.exports = Playlist;
