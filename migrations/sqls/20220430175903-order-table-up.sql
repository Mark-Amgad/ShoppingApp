/* Replace with your SQL commands */

 CREATE TABLE orders(
     id SERIAL,
     user_id integer,
     status integer,
     total_money integer,
     number_of_products integer,
     PRIMARY KEY(id),
     FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);