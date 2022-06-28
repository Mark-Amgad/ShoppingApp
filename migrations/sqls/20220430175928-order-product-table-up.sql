/* Replace with your SQL commands */

CREATE TABLE orders_products(
    id SERIAL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    PRIMARY key(order_id,product_id),
    FOREIGN KEY(order_id) REFERENCES orders(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);