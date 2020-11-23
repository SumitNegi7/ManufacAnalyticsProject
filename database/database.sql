CREATE DATABASE user_database;

-- creating db first
-- \c into todo db
-- creating table 
-- 


CREATE TABLE users(
    user_id SERIAL ,
    email VARCHAR(40) PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL
);