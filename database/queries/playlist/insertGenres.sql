INSERT INTO playlist_genre (playlist_id, genre_id)
SELECT playlist_id, genre_id
FROM (VALUES
    (${playlistid}, ${genre1id}),
    (${playlistid}, ${genre2id}),
    (${playlistid}, ${genre3id})
) s (playlist_id, genre_id)
WHERE genre_id IS NOT NULL;
