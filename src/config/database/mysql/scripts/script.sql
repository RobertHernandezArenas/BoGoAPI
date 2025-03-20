CREATE DATABASE bookandgo_db;
USE bookandgo_db;
SELECT *  FROM users;
SELECT *  FROM experiences;
SELECT *  FROM categories;
-- DROP DATABASE bookandgo_db;

CREATE TABLE user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
				password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                surname VARCHAR(255),
                address TEXT,
                avatar VARCHAR(255),
                birthdate DATE,
                city VARCHAR(255),
                country VARCHAR(255),
                dni VARCHAR(20) UNIQUE,
                gender ENUM('MALE', 'female', 'other'),
                isActive BOOLEAN DEFAULT TRUE,
                phone VARCHAR(20),
                role ENUM('admin', 'user') DEFAULT 'user',
                zipcode VARCHAR(20),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );

            CREATE TABLE category (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                image VARCHAR(255),
                experience_id INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );

            CREATE TABLE experience (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                duration INT,
                dateTo DATE,
                dateFrom DATE,
                location VARCHAR(255),
                capacity INT,
                stock INT,
                availability BOOLEAN DEFAULT TRUE,
                category_id INT NOT NULL,
                reviews TEXT,
                image VARCHAR(255),
                user_id INT NOT NULL,
                isFavorite BOOLEAN DEFAULT FALSE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );

            CREATE TABLE review (
                id INT AUTO_INCREMENT PRIMARY KEY,
                rating INT CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                user_id INT NOT NULL,
                experience_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
                FOREIGN KEY (experience_id) REFERENCES experience(id) ON DELETE CASCADE
            );

            CREATE TABLE cart (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                items TEXT,
                totalPrice DECIMAL(10, 2),
                paymentMethod VARCHAR(255),
                isPaid BOOLEAN DEFAULT FALSE,
                checkoutDate TIMESTAMP,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );