-- Active: 1780668856439@@127.0.0.1@3306@mysql
-- Crea la base de datos solo si no existe, así no da error
CREATE DATABASE IF NOT EXISTS constructora;
-- CREATE DATABASE IF NOT EXISTS constructora;
USE constructora;

-- Tu tabla de herramientas impecable
CREATE TABLE herramientas
(
    idherramienta INT AUTO_INCREMENT PRIMARY KEY,
    nombre        VARCHAR(50) NOT NULL,
    marca         VARCHAR(50) NOT NULL,
    descripcion   VARCHAR(100) NOT NULL,
    fotografia    VARCHAR(200) NULL,
    condicion     ENUM('Bueno', 'Regular', 'Malo') NOT NULL DEFAULT 'Bueno',
    tipo          ENUM('Manual', 'Eléctrica') NOT NULL DEFAULT 'Eléctrica'
) ENGINE = INNODB;

INSERT INTO herramientas (nombre, marca, descripcion, tipo) VALUES
('Alicates', 'Kamasa', 'Para trabajos electricos', 'Manual'),
('Destornillador', 'PB', 'Tipo cruz imantado', 'Manual');

-- x2 Electricas
INSERT INTO herramientas (nombre, marca, descripcion) VALUES
('Amoladora', 'Bosch', '500 Watts'),
('Taladro', 'DeWalt', 'Inalambrico 18V');
-- Muestra el resultado
SELECT * FROM herramientas;

