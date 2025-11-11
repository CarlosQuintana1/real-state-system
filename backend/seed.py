import psycopg2
from app.config.db import get_connection

def seed(properties_list: list[dict]):
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            data = [
                (
                    prop["name"],
                    prop["description"],
                    prop["price"],
                    prop["address"],
                    prop["model_type"],
                    prop["status"],
                    prop["img_url"]
                )
                for prop in properties_list
            ]
            cur.executemany("""
                INSERT INTO "properties"(name, description, price, address, model_type, status, img_url)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, data)

        conn.commit()

        print(f"{len(properties_list)} Propiedades creadas con exito")

    except psycopg2.OperationalError as err:
        print("Error: ", err)

    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    properties = [
        {
            "id": 1,
            "name": "Casa Moderna en Zona Residencial",
            "description": "Hermosa casa de 3 recámaras con amplio jardín y cochera para 2 autos.",
            "price": 3500000,
            "model_type": "house",
            "status": "available",
            "address": "Polanco, CDMX",
            "img_url": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=350&fit=crop"
        },
        {
            "id": 2,
            "name": "Departamento Luxury en Torre Premium",
            "description": "Departamento de 2 recámaras en piso 15 con vista panorámica y amenidades de lujo.",
            "price": 4200000,
            "model_type": "department",
            "status": "rented",
            "address": "Santa Fe, CDMX",
            "img_url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=350&fit=crop"
        },
        {
            "id": 3,
            "name": "Casa con Alberca y Jardín",
            "description": "Espaciosa casa de 4 recámaras con alberca, jardín amplio y área de asador.",
            "price": 5800000,
            "model_type": "house",
            "status": "available",
            "address": "Cuernavaca, Morelos",
            "img_url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=350&fit=crop"
        },
        {
            "id": 4,
            "name": "Departamento Céntrico Amueblado",
            "description": "Departamento de 1 recámara totalmente amueblado en zona céntrica con estacionamiento.",
            "price": 2100000,
            "model_type": "department",
            "status": "available",
            "address": "Roma Norte, CDMX",
            "img_url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=350&fit=crop"
        },
        {
            "id": 5,
            "name": "Casa Colonial Restaurada",
            "description": "Casa estilo colonial de 3 recámaras completamente restaurada con acabados de lujo.",
            "price": 6500000,
            "model_type": "house",
            "status": "available",
            "address": "San Ángel, CDMX",
            "img_url": "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&h=350&fit=crop"
        },
        {
            "id": 6,
            "name": "Penthouse con Terraza Privada",
            "description": "Exclusivo penthouse de 3 recámaras con terraza privada de 100m² y jacuzzi.",
            "price": 8900000,
            "model_type": "department",
            "status": "available",
            "address": "Interlomas, Estado de México",
            "img_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=350&fit=crop"
        },
        {
            "id": 7,
            "name": "Casa Minimalista Nueva",
            "description": "Casa de estreno con diseño minimalista, 3 recámaras, sistema domótico completo.",
            "price": 4800000,
            "model_type": "house",
            "status": "available",
            "address": "Querétaro, Querétaro",
            "img_url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=350&fit=crop"
        },
        {
            "id": 8,
            "name": "Departamento Familiar con Balcón",
            "description": "Departamento de 2 recámaras con balcón, cocina integral y 2 baños completos.",
            "price": 3200000,
            "model_type": "department",
            "status": "sold",
            "address": "Narvarte, CDMX",
            "img_url": "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=500&h=350&fit=crop"
        },
        {
            "id": 9,
            "name": "Casa Campestre con Vista",
            "description": "Casa de 5 recámaras en zona boscosa con vista espectacular y chimenea.",
            "price": 7200000,
            "model_type": "house",
            "status": "sold",
            "address": "Valle de Bravo, Estado de México",
            "img_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=350&fit=crop"
        }
    ]
    seed(properties)