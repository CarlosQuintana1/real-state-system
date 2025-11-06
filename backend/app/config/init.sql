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
    price NUMERIC(15,2) NOT NULL,
    address VARCHAR(200) NOT NULL,
    model_type VARCHAR(30) NOT NULL,
    status property_status NOT NULL DEFAULT 'available',
    seller_id INT REFERENCES "user"(id) ON DELETE SET NULL
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
VALUES ('Century 21');

INSERT INTO properties (name, price, address, model_type, seller_id)
VALUES
  ('Casa Bonita', 2500000.00, 'Av. Reforma 123, CDMX', 'Residencial', 1),
  ('Departamento Centro', 1800000.00, 'Calle Juárez 45, CDMX', 'Condominio', 1);

INSERT INTO company_agents (company_id, user_id) VALUES (1, 1);
INSERT INTO company_properties (company_id, property_id) VALUES (1, 1), (1, 2);