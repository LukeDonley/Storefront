/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users ( 
  id SERIAL PRIMARY KEY, 
  username VARCHAR NOT NULL, 
  email VARCHAR NOT NULL, 
  firstName VARCHAR NOT NULL, 
  lastName VARCHAR NOT NULL, 
  password VARCHAR NOT NULL 
);