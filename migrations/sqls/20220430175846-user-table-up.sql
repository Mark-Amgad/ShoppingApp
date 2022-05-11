/* Replace with your SQL commands */

CREATE TABLE users(
    id SERIAL,
    user_name  VARCHAR(255),
    password text,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    balance integer,
    type integer,
    PRIMARY KEY(id),
    UNIQUE(user_name)
);