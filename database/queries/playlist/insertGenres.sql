INSERT INTO playlist_genre (playlist_id, genre_id)
SELECT playlist_id, genre_id
FROM (VALUES
    (${playlistId}, ${genre1Id}),
    (${playlistId}, ${genre2Id}),
    (${playlistId}, ${genre3Id})
) s (playlist_id, genre_id)
WHERE genre_id IS NOT NULL;
