/* Replace with your SQL commands */

CREATE TABLE orders_products(
    id SERIAL,
    order_id integer,
    product_id integer,
    quantity integer,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE
);