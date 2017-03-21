SELECT title,
  playlist_type AS playlistType,
  price,
  can_pay_more AS canPayMore,
  number_of_tracks AS numberOfTracks,
  duration,
  description,
  release_date
FROM playlists
WHERE user_id = $1;
