-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS resource_a;
DROP TABLE IF EXISTS resource_b;
DROP TABLE IF EXISTS resource_c;

CREATE TABLE resource_a (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE resource_b (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    in_stock BOOLEAN NOT NULL
);

CREATE TABLE resource_c (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    warning TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_resolved BOOLEAN NOT NULL
);