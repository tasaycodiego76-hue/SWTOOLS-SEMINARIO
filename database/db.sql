-- Active: 1781040242497@@127.0.0.1@3306@constructora

CREATE DATABASE constructora;
DROP DATABASE constructora;

USE constructora;

CREATE TABLE herramientas (
    idherramienta   INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(50)     NOT NULL,
    marca           VARCHAR(50)     NOT NULL,
    descripcion     VARCHAR(100)    NOT NULL,
    fotografia      VARCHAR(200)    NULL,
    condicion       ENUM('Bueno', 'Regular', 'Malo') NOT NULL DEFAULT 'Bueno',
    tipo            ENUM('Manual', 'Electrica') NOT NULL DEFAULT 'Electrica'
)ENGINE = INNODB;

-- x2 Manuales
INSERT INTO herramientas (nombre, marca, descripcion, tipo) VALUES
('Alicates', 'Kamasa', 'Para trabajos electricos', 'Manual'),
('Destornillador', 'PB', 'Tipo cruz imantado', 'Manual');

-- x2 Electricas
INSERT INTO herramientas (nombre, marca, descripcion) VALUES
('Amoladora', 'Bosch', '500 Watts'),
('Taladro', 'DeWalt', 'Inalambrico 18V');

SELECT * FROM herramientas;

-- PROCEDIMIENTO ALMACENADO = PROGRAMA se ejecuta en el motor de BD
-- sE PUEDE UTILIZAR COMO UN M'ETODO (INPUT > OUTPUT)
DELIMITER $$
    CREATE PROCEDURE spu_herramientas_listar()
    BEGIN
        SELECT * FROM herramientas ORDER BY idherramienta DESC;
    END $$

CALL spu_herramientas_listar();


DELIMITER $$
    CREATE PROCEDURE spu_herramientas_eliminar(IN _idherramienta INT)
    BEGIN
        DELETE FROM herramientas WHERE idherramienta = _idherramienta;
    END $$

CALL spu_herramientas_eliminar();