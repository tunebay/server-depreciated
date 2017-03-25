SELECT
  "playlist"."id" AS "playlist_id",
  "playlist"."title" AS "playlist_title",
  "playlist"."playlist_type" AS "playlist_type",
  "playlist"."price" AS "playlist_price",
  "playlist"."release_date" AS "playlist_release_date",
  "playlist"."created_at" AS "playlist_created_at",
  "playlist"."can_pay_more" AS "can_pay_more",
  "tracks"."id" AS "track_id",
  "tracks"."price" AS "track_price",
  "tracks"."single" AS "track_single",
  "tracks"."name" AS "track_name",
  "tracks"."location" AS "track_location",
  "tracks"."duration" AS "track_duraiton",
  "tracks"."playlist_position" AS "track_playlist_position"
FROM playlists AS "playlist"
LEFT JOIN tracks AS "tracks" ON playlist.id = tracks.playlist_id
WHERE "playlist".id IN (
  SELECT id FROM playlists
  WHERE user_id = 1
)
ORDER BY "playlist".id, "track_playlist_position";






-- SELECT
--   "playlist"."id" AS "playlist_id",
--   "playlist"."title" AS "playlist_title",
--   "playlist"."playlist_type" AS "playlist_type",
--   "playlist"."price" AS "playlist_price",
--   "playlist"."can_pay_more" AS "can_pay_more",
--   "tracks"."id" AS "track_id",
--   "tracks"."price" AS "track_price",
--   "tracks"."single" AS "track_single",
--   "tracks"."name" AS "track_name",
--   "tracks"."location" AS "track_location",
--   "tracks"."duration" AS "track_duraiton",
--   "tracks"."playlist_position" AS "track_playlist_position"
-- FROM playlists AS "playlist"
-- LEFT JOIN tracks AS "tracks" ON playlist.id = tracks.playlist_id
-- WHERE "playlist".id = 31
-- ORDER BY track_playlist_position;
