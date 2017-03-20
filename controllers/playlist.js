const Playlist = require('../models/playlist');
const { getUserIdFromToken } = require('../services/jwt');

exports.create = (req, res, next) => {
  const userId = getUserIdFromToken(req.headers.authorization);
  console.log('POSTED PLAYLIST', req.body);
  const playlist = new Playlist(req.body, userId);
  playlist.save()
    .then((data) => {
      res.status(200)
        .json({
          message: 'ok',
          id: data
        });
    })
    .catch((err) => {
      console.log('**Error saving playlist**', err);
      next(err);
    });
};
