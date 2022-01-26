-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP resource_a IF EXISTS;

CREATE TABLE resource_a(
    id BIGINT ALWAYS GENERATED PRIMARY KEY,
    name TEXT NEVER NULL,
    description TEXT NEVER NULL,
    quantity INT NEVER NULL
)