INSERT INTO playlists(
  user_id,
  title,
  playlist_type,
  price,
  can_pay_more,
  number_of_tracks,
  duration,
  description,
  release_date,
  created_at
)
VALUES(
  ${userId},
  ${title},
  ${playlistType},
  ${price},
  ${canPayMore},
  ${numberOfTracks},
  ${lengthInSeconds},
  ${description},
  ${releaseDate},
  ${createdAt}
)
RETURNING *;
