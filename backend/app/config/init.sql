CREATE EXTENSION IF NOT EXISTS citext;

DROP TABLE IF EXISTS company_properties CASCADE;
DROP TABLE IF EXISTS company_agents CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS company CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

DROP TYPE IF EXISTS property_status;
DROP TYPE IF EXISTS user_role;

CREATE TYPE property_status AS ENUM ('available', 'sold', 'rented');
CREATE TYPE user_role AS ENUM ('client', 'seller');

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email CITEXT NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'client'
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(200) NOT NULL,
    price NUMERIC(15,2) NOT NULL,
    address VARCHAR(200) NOT NULL,
    model_type VARCHAR(30) NOT NULL,
    status property_status NOT NULL DEFAULT 'available',
    seller_id INT REFERENCES "user"(id) ON DELETE SET NULL,
    img_url TEXT
);

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE company_agents (
    company_id INT NOT NULL REFERENCES company(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    PRIMARY KEY(company_id, user_id)
);

CREATE TABLE company_properties (
    company_id INT NOT NULL REFERENCES company(id) ON DELETE CASCADE,
    property_id INT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    PRIMARY KEY(company_id, property_id)
);

INSERT INTO "user" (name, email, password, role)
VALUES
  ('Admin User', 'admin@example.com', 'admin123', 'seller'),
  ('Client User', 'client@example.com', 'client123', 'client');

INSERT INTO company (name)
VALUES
    ('Century21'),
    ('HollydayU'),
    ('CasasG');

INSERT INTO "user" (name, email, password, role)
VALUES
    ('Juan Pérez', 'juan.perez@example.com', 'pass1', 'seller'),
    ('María López', 'maria.lopez@example.com', 'pass2', 'seller'),
    ('Carlos Gómez', 'carlos.gomez@example.com', 'pass3', 'seller'),
    ('Ana Martínez', 'ana.martinez@example.com', 'pass4', 'seller'),
    ('Luis Fernández', 'luis.fernandez@example.com', 'pass5', 'seller'),
    ('Sofía Rodríguez', 'sofia.rodriguez@example.com', 'pass6', 'seller'),
    ('Miguel Torres', 'miguel.torres@example.com', 'pass7', 'seller'),
    ('Gabriela Sánchez', 'gabriela.sanchez@example.com', 'pass8', 'seller'),
    ('Andrés Ramírez', 'andres.ramirez@example.com', 'pass9', 'seller');

-- Century21 (sellers 1, 2, 3)
INSERT INTO company_agents (company_id, user_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3);

-- HollydayU (sellers 4, 5, 6)
INSERT INTO company_agents (company_id, user_id)
VALUES
    (2, 4),
    (2, 5),
    (2, 6);

-- CasasG (sellers 7, 8, 9)
INSERT INTO company_agents (company_id, user_id)
VALUES
    (3, 7),
    (3, 8),
    (3, 9);

INSERT INTO properties (
    name, description, price, address, model_type, status, seller_id, img_url
) VALUES
-- Seller 1
('Casa Moderna en Zona Residencial',
 'Hermosa casa de 3 recámaras con amplio jardín y cochera para 2 autos.',
 3500000, 'Polanco, CDMX', 'house', 'available', 1,
 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=350&fit=crop'),

('Departamento Luxury en Torre Premium',
 'Departamento de 2 recámaras en piso 15 con vista panorámica y amenidades de lujo.',
 4200000, 'Santa Fe, CDMX', 'department', 'rented', 1,
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=350&fit=crop'),

('Casa con Alberca y Jardín',
 'Espaciosa casa de 4 recámaras con alberca, jardín amplio y área de asador.',
 5800000, 'Cuernavaca, Morelos', 'house', 'available', 1,
 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=350&fit=crop'),

-- Seller 2
('Departamento Céntrico Amueblado',
 'Departamento de 1 recámara totalmente amueblado en zona céntrica con estacionamiento.',
 2100000, 'Roma Norte, CDMX', 'department', 'available', 2,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=350&fit=crop'),

('Casa Colonial Restaurada',
 'Casa estilo colonial de 3 recámaras completamente restaurada con acabados de lujo.',
 6500000, 'San Ángel, CDMX', 'house', 'available', 2,
 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&h=350&fit=crop'),

('Penthouse con Terraza Privada',
 'Exclusivo penthouse de 3 recámaras con terraza privada de 100m² y jacuzzi.',
 8900000, 'Interlomas, Estado de México', 'department', 'available', 2,
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=350&fit=crop'),

-- Seller 3
('Casa Minimalista Nueva',
 'Casa de estreno con diseño minimalista, 3 recámaras, sistema domótico completo.',
 4800000, 'Querétaro, Querétaro', 'house', 'available', 3,
 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=350&fit=crop'),

('Departamento Familiar con Balcón',
 'Departamento de 2 recámaras con balcón, cocina integral y 2 baños completos.',
 3200000, 'Narvarte, CDMX', 'department', 'sold', 3,
 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=500&h=350&fit=crop'),

('Casa Campestre con Vista',
 'Casa de 5 recámaras en zona boscosa con vista espectacular y chimenea.',
 7200000, 'Valle de Bravo, Estado de México', 'house', 'sold', 3,
 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=350&fit=crop'),

-- Seller 4
('Departamento Minimalista con Vista Panorámica',
 'Moderno departamento de 2 recámaras en piso alto, con balcón y vista a la ciudad.',
 2800000, 'Santa Fe, CDMX', 'department', 'available', 4,
 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500&h=350&fit=crop'),

('Casa Familiar con Alberca',
 'Amplia casa de 4 recámaras con jardín, área social y alberca privada.',
 5200000, 'Zapopan, Jalisco', 'house', 'sold', 4,
 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=350&fit=crop'),

('Loft Industrial en Zona Creativa',
 'Loft de concepto abierto con acabados industriales y excelente iluminación.',
 1950000, 'La Roma, CDMX', 'department', 'available', 4,
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&h=350&fit=crop'),

-- Seller 5
('Penthouse de Lujo con Terraza Privada',
 'Penthouse de 3 recámaras con terraza panorámica y acabados premium.',
 7800000, 'San Pedro Garza García, Nuevo León', 'department', 'available', 5,
 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=500&h=350&fit=crop'),

('Casa Rústica en Zona Campestre',
 'Casa rústica de madera y piedra, ideal para descanso en zona tranquila.',
 2400000, 'Valle de Bravo, Estado de México', 'house', 'available', 5,
 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=350&fit=crop'),

('Departamento Remodelado en Edificio Histórico',
 'Departamento de 1 recámara con acabados modernos dentro de un edificio restaurado.',
 1650000, 'Centro Histórico, Puebla', 'department', 'available', 5,
 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&h=350&fit=crop'),

-- Seller 6
('Estudio Compacto para Ejecutivos',
 'Estudio moderno y funcional, ideal para ejecutivos o estudiantes.',
 1100000, 'Guadalajara, Jalisco', 'department', 'available', 6,
 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),

('Casa de Lujo con Jardín Zen',
 'Residencia premium con 3 recámaras, sala de cine y jardín zen.',
 6400000, 'Querétaro, Querétaro', 'house', 'available', 6,
 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=350&fit=crop'),

-- Seller 7
('Cabaña Moderna en la Montaña',
 'Cabaña contemporánea con chimenea, terraza y vista al bosque.',
 2100000, 'San Cristóbal de las Casas, Chiapas', 'house', 'sold', 7,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=350&fit=crop'),

-- Seller 8
('Residencia Ejecutiva con Oficina Integrada',
 'Casa moderna con espacio de oficina, 2 niveles y patio trasero.',
 3600000, 'Mérida, Yucatán', 'house', 'available', 8,
 'https://plus.unsplash.com/premium_photo-1676321688612-4451a8721435?q=80&w=2814&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

-- Century21 (propiedades de sellers 1, 2, 3)
INSERT INTO company_properties (company_id, property_id)
VALUES
    (1, 1), (1, 2), (1, 3),   -- propiedades de seller 1
    (1, 4), (1, 5), (1, 6),   -- propiedades de seller 2
    (1, 7), (1, 8), (1, 9);   -- propiedades de seller 3

-- HollydayU (propiedades de sellers 4, 5, 6)
INSERT INTO company_properties (company_id, property_id)
VALUES
    (2, 10), (2, 11), (2, 12), -- propiedades de seller 4
    (2, 13), (2, 14), (2, 15), -- propiedades de seller 5
    (2, 16), (2, 17);           -- propiedades de seller 6

-- CasasG (propiedades de sellers 7, 8)
INSERT INTO company_properties (company_id, property_id)
VALUES
    (3, 18),                    -- propiedad de seller 7
    (3, 19);                    -- propiedad de seller 8
