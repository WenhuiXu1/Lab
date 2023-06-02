CREATE DATABASE greenr_sa;
\c greenr_sa

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_digest TEXT
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    depot_id INT,
    user_id INT,
    comment TEXT
);