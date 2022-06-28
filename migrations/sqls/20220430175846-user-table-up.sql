/* Replace with your SQL commands */

CREATE TABLE users(
    id SERIAL,
    user_name  VARCHAR(255),
    password text NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    balance integer,
    type integer NOT NULL,
    PRIMARY KEY(id),
    UNIQUE(user_name)
);