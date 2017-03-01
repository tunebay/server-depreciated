UPDATE users
SET last_login = $1, active = $2
WHERE id = $3
RETURNING last_login, username;
