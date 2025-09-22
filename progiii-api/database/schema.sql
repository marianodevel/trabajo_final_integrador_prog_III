-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS progiii_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE progiii_db;

-- Tabla: usuarios
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('cliente', 'empleado', 'administrador') NOT NULL,
    celular VARCHAR(20),
    foto VARCHAR(255),
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1
);

-- Tabla: salones
CREATE TABLE salones (
    salon_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    capacidad INT NOT NULL,
    importe DECIMAL(10, 2) NOT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1
);

-- Tabla: servicios
CREATE TABLE servicios (
    servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    importe DECIMAL(10, 2) NOT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1
);

-- Tabla: turnos
CREATE TABLE turnos (
    turno_id INT AUTO_INCREMENT PRIMARY KEY,
    orden INT NOT NULL,
    hora_desde TIME NOT NULL,
    hora_hasta TIME NOT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1,
    UNIQUE KEY unique_orden (orden)
);

-- Tabla: reservas
CREATE TABLE reservas (
    reserva_id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_reserva DATE NOT NULL,
    salon_id INT NOT NULL,
    usuario_id INT NOT NULL,
    turno_id INT NOT NULL,
    foto_cumpleaniero VARCHAR(255),
    tematica VARCHAR(100),
    importe_salon DECIMAL(10, 2) NOT NULL,
    importe_total DECIMAL(10, 2) NOT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1,
    FOREIGN KEY (salon_id) REFERENCES salones(salon_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY (turno_id) REFERENCES turnos(turno_id)
);

-- Tabla: reservas_servicios (relación muchos a muchos entre reserva y servicio)
CREATE TABLE reservas_servicios (
    reserva_servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT NOT NULL,
    servicio_id INT NOT NULL,
    importe DECIMAL(10, 2) NOT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1,
    FOREIGN KEY (reserva_id) REFERENCES reservas(reserva_id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(servicio_id)
);