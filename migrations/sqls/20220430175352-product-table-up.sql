/* Replace with your SQL commands */

CREATE TABLE product(
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(255),
    status integer NOT NULL,
    description text,
    likes integer,
    dislikes integer,
    PRIMARY KEY(id)

 );