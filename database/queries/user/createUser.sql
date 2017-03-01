INSERT INTO users(
  display_name,
  username,
  email,
  created_at,
  active,
  account_type,
  password_hash
)
VALUES(
  ${displayName},
  ${username},
  ${email},
  ${createdAt},
  ${active},
  ${accountType},
  ${password}
)
RETURNING *;
