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