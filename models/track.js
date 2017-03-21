const { db, sql } = require('../database/config');

const sqlCreateTrack = sql('./queries/track/createTrack.sql');

class Track {
  constructor(track, playlistId) {
    this.playlistId = playlistId;
    this.name = track.name;
    this.duration = track.duration;
    this.price = track.price;
    this.playlistPosition = track.playlistPosition;
    this.isASingle = track.isASingle;
    this.fileType = track.fileType;
    this.location = track.location;
  }

  save() {
    return new Promise((resolve, reject) => {
      db.one(sqlCreateTrack, this)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log('SAVE TRACK ERROR', err);
          reject(err);
        });
    });
  }
}

module.exports = Track;
