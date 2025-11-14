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
    ('Seller 1', 'seller1@example.com', 'pass1', 'seller'),
    ('Seller 2', 'seller2@example.com', 'pass2', 'seller'),
    ('Seller 3', 'seller3@example.com', 'pass3', 'seller'),
    ('Seller 4', 'seller4@example.com', 'pass4', 'seller'),
    ('Seller 5', 'seller5@example.com', 'pass5', 'seller'),
    ('Seller 6', 'seller6@example.com', 'pass6', 'seller'),
    ('Seller 7', 'seller7@example.com', 'pass7', 'seller'),
    ('Seller 8', 'seller8@example.com', 'pass8', 'seller'),
    ('Seller 9', 'seller9@example.com', 'pass9', 'seller');

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
