CREATE DATABASE greenr_sa;
\c greenr_sa

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_digest TEXT
);