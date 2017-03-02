const Playlist = require('../models/playlist');

exports.create = (req, res, next) => {
  const playlist = new Playlist(req.body);
  playlist.save()
    .then((data) => {
      res.status(200)
        .json({
          message: 'ok',
          id: data.id
        });
    })
    .catch((err) => {
      console.log('Error saving playlist', err);
      next(err);
    });
};
