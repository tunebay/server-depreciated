SELECT
  "user"."display_name" AS "displayName",
  "playlist"."id" AS "playlist_id",
  "playlist"."title" AS "title",
  "playlist"."playlist_type" AS "playlistType",
  "playlist"."price" AS "playlistPrice",
  "playlist"."release_date" AS "releaseDate",
  "playlist"."created_at" AS "createdAt",
  "playlist"."can_pay_more" AS "canPayMore",
  "tracks"."price" AS "trackPrice",
  "tracks"."single" AS "single",
  "tracks"."name" AS "name",
  "tracks"."location" AS "location",
  "tracks"."duration" AS "duration",
  "tracks"."playlist_position" AS "position"
FROM playlists AS "playlist"
LEFT JOIN tracks AS "tracks" ON playlist.id = tracks.playlist_id
LEFT JOIN users AS "user" ON playlist.user_id = "user".id
WHERE "playlist".id IN (
  SELECT id FROM playlists
  WHERE user_id = $1
)
ORDER BY "playlist".id, "position";

-- "user"."display_name" AS "displayName",
-- LEFT JOIN user AS "user" ON playlist.user_id = user.id
