# WStools - Backend que sirve datos a la app Android de Herramientas

## Procedimientos de ejecución

### 1. Clonar el repositorio
```
git clone https://github.com/tasaycodiego76-hue/SWTOOLS-SEMINARIO.git
```

### 2. Ejecutar npm install
```
npm install
```

### 3. Restaurar la base de datos
Ejecuta el siguiente script en tu motor MySQL:
```sql
CREATE DATABASE constructora;

USE constructora;

CREATE TABLE herramientas (
    idherramienta   INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(50)     NOT NULL,
    marca           VARCHAR(50)     NOT NULL,
    descripcion     VARCHAR(100)    NOT NULL,
    fotografia      VARCHAR(200)    NULL,
    condicion       ENUM('Bueno', 'Regular', 'Malo') NOT NULL DEFAULT 'Bueno',
    tipo            ENUM('Manual', 'Electrica') NOT NULL DEFAULT 'Electrica'
) ENGINE = INNODB;

INSERT INTO herramientas (nombre, marca, descripcion, tipo) VALUES
('Alicates', 'Kamasa', 'Para trabajos electricos', 'Manual'),
('Destornillador', 'PB', 'Tipo cruz imantado', 'Manual');

INSERT INTO herramientas (nombre, marca, descripcion) VALUES
('Amoladora', 'Bosch', '500 Watts'),
('Taladro', 'DeWalt', 'Inalambrico 18V');
```

### 4. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=constructora
DB_PORT=3306
PORT=3000
```

### 5. Ejecutar la aplicación
```
nodemon server.js
```

---

## 📁 Estructura del Proyecto

```
SWTOOLS-SEMINARIO/
├── config/
│   └── db.js                  → Conexión al pool de MySQL
├── database/
│   └── db.sql                 → Script de creación de BD y tabla
├── routes/
│   └── herramientas.js        → Rutas y lógica CRUD de herramientas
├── .env                       → Variables de entorno
├── .gitignore
├── package.json
└── server.js                  → Servidor Express principal
```