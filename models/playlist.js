const { db, sql } = require('../database/config');
const { getCurrentTimestamp } = require('../services/helpers');

// file paths relative to 'sql()' function in /database/config.js
const sqlCreatePlaylist = sql('./queries/playlist/createPlaylist.sql');
const sqlInsertGenres = sql('./queries/playlist/insertGenres.sql');

class Playlist {
  constructor(playlist) {
    // required fields
    this.title = playlist.title;
    this.playlistType = playlist.playlistType;
    this.userId = playlist.userId;
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
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
}

module.exports = Playlist;
