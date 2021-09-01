/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders ( 
  id SERIAL PRIMARY KEY, 
  user_id bigint REFERENCES users(id), 
  status VARCHAR(64) NOT NULL
);