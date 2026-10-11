CREATE DATABASE IF NOT EXISTS db_todo;
USE db_todo;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    waktu_notif DATETIME,
    prioritas ENUM('high', 'medium', 'low') DEFAULT 'high',
    lampiran LONGTEXT,
    selesai BOOLEAN DEFAULT 0,
    kategori ENUM('personal', 'shared') DEFAULT 'personal',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);