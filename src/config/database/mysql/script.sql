CREATE DATABASE bookandgo_db;
USE bookandgo_db;
SELECT *  FROM users;
SELECT *  FROM experiences;
SELECT *  FROM categories;
-- DROP DATABASE bookandgo_db;

-- Query experiences + categories
SELECT 
exp.*,
cat.*,
exp.name AS experience_name,
cat.name AS categories_name,
exp.image AS experience_image,
cat.image AS categories_image
FROM experiences exp
INNER JOIN categories cat
ON exp.category_id = cat.id;


CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME
    
)

CREATE TABLE experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL,
    dateTo DATE NOT NULL,
    dateFrom DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    stock INT NOT NULL,
    availability BOOLEAN NOT NULL,
    isFavorite BOOLEAN NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);