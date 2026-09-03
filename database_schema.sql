-- Create Database
CREATE DATABASE IF NOT EXISTS travelmate_db;
USE travelmate_db;

-- The tables will be automatically created by Hibernate (spring.jpa.hibernate.ddl-auto=update)
-- However, here is the manual schema for reference:

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL
);

-- Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    city VARCHAR(255),
    description TEXT,
    estimated_cost DECIMAL(19, 2),
    latitude DOUBLE,
    longitude DOUBLE
);

-- Trips Table
CREATE TABLE IF NOT EXISTS trips (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(19, 2),
    total_expense DECIMAL(19, 2) DEFAULT 0,
    traveler_id BIGINT,
    FOREIGN KEY (traveler_id) REFERENCES users(id)
);

-- Itineraries Table
CREATE TABLE IF NOT EXISTS itineraries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    day_number INT,
    activity TEXT,
    estimated_expense DECIMAL(19, 2),
    trip_id BIGINT,
    destination_id BIGINT,
    FOREIGN KEY (trip_id) REFERENCES trips(id),
    FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

-- Routes Table
CREATE TABLE IF NOT EXISTS routes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(255),
    destination VARCHAR(255),
    distance DOUBLE,
    estimated_travel_time DOUBLE,
    transport_mode VARCHAR(50)
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255),
    amount DECIMAL(19, 2),
    date DATE,
    trip_id BIGINT,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

-- Travel Packages Table
CREATE TABLE IF NOT EXISTS travel_packages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    package_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(19, 2),
    guide_id BIGINT,
    FOREIGN KEY (guide_id) REFERENCES users(id)
);

-- Initial Admin User (Password is 'admin123' encoded with BCrypt)
INSERT INTO users (username, password, full_name, email, role) 
VALUES ('admin', '$2a$10$8.UnVuG9HHgffUDAlk8qn.6nQH22L9YvGky.SInw65B17HInW.67C', 'Administrator', 'admin@travelmate.com', 'ROLE_ADMIN');
