-- Car Rental System Database Schema
-- Created: June 8, 2025

-- Create database
CREATE DATABASE IF NOT EXISTS car_rental_system;
USE car_rental_system;

-- =============================================
-- User & Role Module (4 tables)
-- =============================================

-- Table: role
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: user
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    avatar_url VARCHAR(500),
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: user_role
CREATE TABLE user_role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_role (user_id, role_id)
);

-- Table: user_session
CREATE TABLE user_session (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    refresh_token_id VARCHAR(255) NOT NULL,
    device_info TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expired_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Table: otp_request
CREATE TABLE otp_request (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    request_type ENUM('registration', 'forgot_password', 'host_registration') NOT NULL,
    status ENUM('pending', 'verified', 'failed', 'expired', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expired_at TIMESTAMP NOT NULL
);

-- =============================================
-- User Identification Module (2 tables)
-- =============================================

-- Table: user_identification
CREATE TABLE user_identification (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    verified_by_user_id INT,
    verified_at TIMESTAMP NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    national_id_number VARCHAR(20) NOT NULL,
    national_id_front_image_url VARCHAR(500),
    selfie_with_national_id_image_url VARCHAR(500),
    status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by_user_id) REFERENCES user(id) ON DELETE SET NULL
);

-- Table: driving_license
CREATE TABLE driving_license (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    verified_by_user_id INT,
    verified_at TIMESTAMP NULL,
    license_number VARCHAR(20) NOT NULL,
    full_name_on_license VARCHAR(100) NOT NULL,
    status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    license_front_image_url VARCHAR(500),
    license_back_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by_user_id) REFERENCES user(id) ON DELETE SET NULL
);

-- =============================================
-- Car Module (4 tables)
-- =============================================

-- Table: car_location
CREATE TABLE car_location (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    province VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    ward VARCHAR(100) NOT NULL,
    address_details TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Table: car
CREATE TABLE car (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    location_id INT NOT NULL,
    license_plate_number VARCHAR(20) NOT NULL UNIQUE,
    year_of_manufacture YEAR NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    number_of_seats INT NOT NULL,
    fuel_type ENUM('gasoline', 'diesel', 'electric', 'hybrid') NOT NULL,
    transmission_type ENUM('manual', 'automatic') NOT NULL,
    fuel_consumption DECIMAL(4, 2),
    base_price_per_day DECIMAL(10, 2) NOT NULL,
    description TEXT,
    approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    status ENUM('active', 'rented', 'inactive', 'banned') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES car_location(id) ON DELETE RESTRICT
);

-- Table: car_image
CREATE TABLE car_image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    car_id INT NOT NULL,
    image_order INT NOT NULL DEFAULT 1,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES car(id) ON DELETE CASCADE
);

-- Table: car_certificate
CREATE TABLE car_certificate (
    id INT PRIMARY KEY AUTO_INCREMENT,
    car_id INT NOT NULL,
    registration_url VARCHAR(500),
    inspection_url VARCHAR(500),
    insurance_url VARCHAR(500),
    front_image_url VARCHAR(500),
    left_image_url VARCHAR(500),
    right_image_url VARCHAR(500),
    back_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES car(id) ON DELETE CASCADE
);

-- =============================================
-- Trip Module (2 tables)
-- =============================================

-- Table: trip
CREATE TABLE trip (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trip_code VARCHAR(20) NOT NULL UNIQUE,
    car_id INT NOT NULL,
    renter_id INT NOT NULL,
    pickup_date DATETIME NOT NULL,
    return_date DATETIME NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    approval_time TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES car(id) ON DELETE RESTRICT,
    FOREIGN KEY (renter_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Table: trip_cancellation
CREATE TABLE trip_cancellation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trip_id INT NOT NULL,
    cancelled_by_user_id INT NOT NULL,
    cancelled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trip(id) ON DELETE CASCADE,
    FOREIGN KEY (cancelled_by_user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- =============================================
-- Create Indexes for Performance
-- =============================================

-- User table indexes
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_user_username ON user(username);
CREATE INDEX idx_user_status ON user(status);

-- Car table indexes
CREATE INDEX idx_car_owner ON car(owner_id);
CREATE INDEX idx_car_location ON car(location_id);
CREATE INDEX idx_car_status ON car(status);
CREATE INDEX idx_car_approval_status ON car(approval_status);

-- Trip table indexes
CREATE INDEX idx_trip_car ON trip(car_id);
CREATE INDEX idx_trip_renter ON trip(renter_id);
CREATE INDEX idx_trip_status ON trip(status);
CREATE INDEX idx_trip_dates ON trip(pickup_date, return_date);

-- Session table indexes
CREATE INDEX idx_session_user ON user_session(user_id);
CREATE INDEX idx_session_token ON user_session(refresh_token_id);

-- OTP table indexes
CREATE INDEX idx_otp_email ON otp_request(email);
CREATE INDEX idx_otp_code ON otp_request(code);

-- =============================================
-- Insert Sample Data
-- =============================================

-- Insert default roles
INSERT INTO role (name, description) VALUES
('admin', 'System administrator with full access'),
('host', 'Car owner who rents out vehicles'),
('renter', 'User who rents vehicles'),
('moderator', 'Content moderator');

COMMIT;