const { db, sql } = require('../database/config');

// file paths relative sql function in /database/config.js
const sqlCreatePlaylist = sql('./queries/playlist/createPlaylist.sql');

class Playlist {
  constructor(playlist) {
    // required fields
    this.title = playlist.title;
    this.playlistType = playlist.playlistType;
    this.userId = playlist.userId;
    this.numberofTracks = playlist.numberofTracks;
    this.price = playlist.price;
    this.canPayMore = playlist.canPayMore;
    this.lengthInSeconds = playlist.lengthInSeconds;
    this.genre1Id = playlist.genre1Id;
    // unrequired fields
    this.genre1Id = playlist.genre1Id || null;
    this.genre2Id = playlist.genre2Id || null;
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
