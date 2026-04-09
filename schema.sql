-- Create database
CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  address   VARCHAR(255) NOT NULL,
  latitude  FLOAT        NOT NULL,
  longitude FLOAT        NOT NULL
);

-- Sample inserts
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('ABC School',       'New Delhi',        28.6139, 77.2090),
  ('Sunshine Academy', 'Connaught Place',  28.6315, 77.2167),
  ('Green Valley High','Gurugram',         28.4595, 77.0266),
  ('City Public School','Noida',           28.5355, 77.3910);
