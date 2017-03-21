const User = require('../models/user');
const Playlist = require('../models/playlist');

exports.loadUserById = (req, res, next) => {
  return User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404)
          .json({ error: 'Could not find user' });
      }
      return res.status(200)
        .json({
          message: 'Loaded user successfully',
          status: 'success',
          user: data
        });
    })
    .catch(error => next(error));
};

exports.loadUserByUsername = (req, res, next) => {
  return User.findByUsername(req.params.username)
    .then((userData) => {
      if (!userData) {
        return res.status(404)
          .json({ error: 'Could not find user' });
      }
      return Playlist.findAllByUserId(userData.id)
        .then((playlistsData) => {
          console.log('playlists data: ', playlistsData);
          return res.status(200)
          .json({
            message: 'Loaded user successfully',
            status: 'success',
            user: Object.assign(userData, { playlists: playlistsData })
          });
        });
    })
    .catch(error => next(error));
};
