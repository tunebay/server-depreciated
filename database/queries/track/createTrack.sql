INSERT INTO tracks(
  playlist_id,
  name,
  duration,
  price,
  playlist_position,
  single,
  file_type,
  location
)
VALUES(
  ${playlistId},
  ${name},
  ${duration},
  ${price},
  ${playlistPosition},
  ${isASingle},
  ${fileType},
  ${location}
)
RETURNING id;
