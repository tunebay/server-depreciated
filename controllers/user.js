const userQueries = require('../database/queries/user.queries');
const Playlist = require('../models/playlist');

exports.loadAllUsers = (req, res, next) => {
  return userQueries.getAll(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404)
          .json({ error: 'Could not find user' });
      }
      return res.status(200)
        .json({
          message: 'Loaded all users successfully',
          status: 'success',
          users: data
        });
    })
    .catch(error => next(error));
};

exports.loadUserById = (req, res, next) => {
  return userQueries.findById(req.params.id)
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
  return userQueries.findByUsername(req.params.username)
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
            user: {
              id: userData.id,
              displayName: userData.display_name,
              username: userData.username
            },
            playlists: playlistsData
          });
        });
    })
    .catch(error => next(error));
};
