const Playlist = require('../models/playlist');
const Track = require('../models/track');
const { getUserIdFromToken } = require('../services/jwt');

exports.create = (req, res, next) => {
  const userId = getUserIdFromToken(req.headers.authorization);
  // console.log('POSTED PLAYLIST', req.body);
  const playlist = new Playlist(req.body, userId);
  playlist.save()
    .then((playlistId) => {
      let tracksInserted = 0;
      req.body.tracks.forEach((obj) => {
        const track = new Track(obj, playlistId);
        track.save()
          .then(() => {
            tracksInserted += 1;
            if (tracksInserted === req.body.numberOfTracks) {
              res.status(200)
                .json({
                  message: 'ok',
                  id: playlistId,
                  tracksInserted
                });
            }
          });
      });
    })
    .catch((err) => {
      console.log('**Error saving playlist**', err);
      next(err);
    });
};

// res.status(200)
//   .json({
//     message: 'ok',
//     id: data
//   });
