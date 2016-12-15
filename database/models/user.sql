CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  display_name VARCHAR(24) NOT NULL,
  email VARCHAR(64) NOT NULL UNIQUE,
  username VARCHAR(20) NOT NULL UNIQUE
  password_hash VARCHAR,
  created_at TIMESTAMP NOT NULL,
  last_login TIMESTAMP,
  active BOOLEAN NOT NULL,
  account_type VARCHAR(10) NOT NULL
);
