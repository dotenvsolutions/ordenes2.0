CREATE DATABASE 'D:\ordenes\ordenes_prototipo.db' LOG ON 'ordenes_prototipo.log' COLLATION '1252LATIN1' NCHAR COLLATION 'UCA(Locale=es_EC;SortType=Standard)' JCONNECT OFF DBA USER 'dba' DBA PASSWORD '***';
db init
dbinit -z "1252LATIN1" -zn "UCA(Locale=es_EC;SortType=Standard)" -i -dba "dba","***" -t "ordenes_prototipo.log" "D:\ordenes\ordenes_prototipo.db"


CREATE TABLE po_empresa (
    codigo INTEGER NOT NULL DEFAULT autoincrement,
    nombre VARCHAR(500) NOT NULL,
    telefono VARCHAR(25) NULL,
    direccion TEXT NULL,
    email varchar(250) NOT NULL,
    logo LONG VARCHAR NULL,
    observacion TEXT NULL,
    periodo CHAR(4) NOT NULL,
    PRIMARY KEY (codigo)
) IN "system";

INSERT INTO po_empresa (nombre,telefono,direccion,email,logo,observacion,perido) 
VALUES ('SISTEMAS INFORMÁTICOS GENESIS','XXXXXXXXX','PORTOVIEJO MANABI ECUADOR','billygarcia@gmail.com',NULL,NULL,'2023');

CREATE TABLE po_roles (
    codigo INTEGER NOT NULL DEFAULT autoincrement,
    empresa_id INTEGER NOT NULL,
    nombre VARCHAR(500) NOT NULL,
    observacion TEXT NULL,
    PRIMARY KEY (codigo ASC,empresa_id ASC),
    FOREIGN KEY empresa (empresa_id) REFERENCES po_empresa(codigo) ON DELETE CASCADE,
) IN "system";


CREATE TABLE po_usuarios (
    uuid CHAR(32) NOT NULL UNIQUE,
    codigo INTEGER NOT NULL DEFAULT autoincrement,
    empresa_id INTEGER NOT NULL,
    rol_id INTEGER NULL,
    user_name VARCHAR(250) NOT NULL,
    user_pass VARCHAR(250) NOT NULL,
    nombre VARCHAR(350) NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    observacion TEXT NULL,
    "created_at" TIMESTAMP NULL,
    "updated_at" TIMESTAMP NULL DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (uuid,empresa_id),
    FOREIGN KEY empresa (empresa_id) REFERENCES po_empresa(codigo) ON DELETE CASCADE, 
    FOREIGN KEY rol (rol_id,empresa_id) REFERENCES po_roles(codigo,empresa_id) ON UPDATE CASCADE, 
) IN "system";


CREATE TABLE po_roles_permisos (
    codigo INTEGER NOT NULL DEFAULT autoincrement,
    empresa_id INTEGER NOT NULL,
    rol_id INTEGER NULL,
    visualiza CHAR(1) NULL DEFAULT 'N',
    crea CHAR(1) NULL DEFAULT 'N',
    modifica CHAR(1) NULL DEFAULT 'N',
    elimina CHAR(1) NULL DEFAULT 'N',
    "created_at" TIMESTAMP NULL,
    "updated_at" TIMESTAMP NULL DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (codigo,empresa_id),
    FOREIGN KEY empresa (empresa_id) REFERENCES po_empresa(codigo) ON DELETE CASCADE, 
    FOREIGN KEY rol (rol_id,empresa_id) REFERENCES po_roles(codigo,empresa_id) ON UPDATE CASCADE, 
) IN "system";

CREATE TABLE po_clientes (
    uuid CHAR(32) NOT NULL UNIQUE,
    codigo INTEGER NOT NULL DEFAULT autoincrement,
    empresa_id INTEGER NOT NULL,
    tipo_identifica INTEGER NOT NULL,
    cedula VARCHAR(13) NOT NULL,
    nombres_apellidos VARCHAR(500) NOT NULL,
    telefono_fijo VARCHAR(25) NULL,
    telefono_movil VARCHAR(25) NULL,
    telefono_otro VARCHAR(25) NULL,
    direccion_primaria VARCHAR(350) NULL,
    direccion_secundaria VARCHAR(500) NULL,
    email VARCHAR(250) NOT NULL,
    observacion TEXT NULL,
    fechai date NULL,
    activo CHAR(1) NOT NULL DEFAULT 'S',
    user_registro CHAR(32) NULL,
    user_modifica CHAR(32) NULL,
    "created_at" TIMESTAMP NULL,
    "updated_at" TIMESTAMP NULL DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (uuid,empresa_id),
    FOREIGN KEY empresa (empresa_id) REFERENCES po_empresa(codigo) ON DELETE CASCADE, 
) IN "system";
COMMENT ON COLUMN "DBA"."po_clientes"."tipo_identifica" IS 'ACEPTA 1 para CEDULA, 2 para RUC, 3 para PASAPORTE, 4 PARA OTROS';

CREATE TABLE po_proyectos (
    uuid CHAR(32) NOT NULL UNIQUE,
    empresa_id INTEGER NOT NULL,
    cliente_id CHAR(32) NOT NULL,
    nombre VARCHAR(750) NOT NULL,
    descripcion_corta VARCHAR(1500) NULL,
    fecha_entrega DATE NOT NULL,
    observacion TEXT NULL,
    icono LONG VARCHAR NULL,
    activo CHAR(1) NOT NULL DEFAULT 'S',
    user_registro CHAR(32) NULL,
    user_modifica CHAR(32) NULL,
    "created_at" TIMESTAMP NULL,
    "updated_at" TIMESTAMP NULL DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (uuid,empresa_id),
    FOREIGN KEY empresa (empresa_id) REFERENCES po_empresa(codigo) ON DELETE CASCADE, 
    FOREIGN KEY cliente (cliente_id,empresa_id) REFERENCES po_clientes(uuid,empresa_id) ON UPDATE CASCADE, 
) IN "system";

CREATE TABLE po_estado_actividad (
    codigo INTEGER NOT NULL DEFAULT autoincrement,
    empresa_id INTEGER NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    observacion VARCHAR(1500) NULL,
    "created_at" TIMESTAMP NULL,
    "updated_at" TIMESTAMP NULL DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (codigo,empresa_id),
    FOREIGN KEY empresa (empresa_id) REFERENCES po_empresa(codigo) ON DELETE CASCADE,  
) IN "system";

CREATE TABLE po_cab_actividad (
    uuid CHAR(32) NOT NULL UNIQUE,
    empresa_id INTEGER NOT NULL,
    proyecto_id CHAR(32) NOT NULL,
    user_id CHAR(32) NOT NULL,
    estado_id INTEGER NOT NULL,
    descripcion VARCHAR(1500) NOT NULL,
    fecha_entrega DATE NOT NULL,
    observacion TEXT NULL,
    icono LONG VARCHAR NULL,
    user_registro CHAR(32) NULL,
    user_modifica CHAR(32) NULL,
    "created_at" TIMESTAMP NULL,
    "updated_at" TIMESTAMP NULL DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (uuid,empresa_id),
    FOREIGN KEY empresa (empresa_id) REFERENCES po_empresa(codigo) ON DELETE CASCADE, 
    FOREIGN KEY proyecto (proyecto_id,empresa_id) REFERENCES po_proyectos(uuid,empresa_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY estado (estado_id,empresa_id) REFERENCES po_estado_actividad (codigo,empresa_id) ON UPDATE CASCADE,
    FOREIGN KEY usuario (user_id,empresa_id) REFERENCES po_usuarios(uuid,empresa_id) ON UPDATE CASCADE, 
) IN "system";

CREATE TABLE po_act_moviento (
    secuencia INTEGER NOT NULL DEFAULT autoincrement,
    empresa_id INTEGER NOT NULL,
    actividad_id CHAR(32) NOT NULL,
    estado_id INTEGER NOT NULL,
    fecha_entrega DATE NULL,
    descripcion TEXT NULL,
    user_registro CHAR(32) NULL,
    user_modifica CHAR(32) NULL,
    "created_at" TIMESTAMP NULL,
    "updated_at" TIMESTAMP NULL DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (secuencia,empresa_id),
    FOREIGN KEY empresa (empresa_id) REFERENCES po_empresa(codigo) ON DELETE CASCADE, 
    FOREIGN KEY estado (estado_id,empresa_id) REFERENCES po_estado_actividad (codigo,empresa_id) ON UPDATE CASCADE,
) IN "system";