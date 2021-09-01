/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS order_products ( 
  id SERIAL PRIMARY KEY, 
  order_id bigint REFERENCES orders(id), 
  product_id bigint REFERENCES products(id), 
  quantity INTEGER NOT NULL
);