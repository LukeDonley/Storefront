/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS products ( 
  id SERIAL PRIMARY KEY, 
  name VARCHAR NOT NULL, 
  type VARCHAR NOT NULL, 
  weight FLOAT NOT NULL,
  price FLOAT NOT NULL,
  category VARCHAR
);