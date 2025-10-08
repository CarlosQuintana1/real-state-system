import psycopg2
import random
from faker import Faker
from app.config.db import get_connection

def seed():
    conn = None
    fake = Faker()
    try:
        conn = get_connection()
        properties = []

        for _ in range(10):
            properties.append((
                fake.street_name(),
                round(random.randint(1000000, 10000000), 2),
                fake.address(),
                random.choice(["house", "apartment", "office"]),
                random.choice(["available", "sold", "rented"])
            ))

        with conn.cursor() as cur:
            cur.executemany("""
                INSERT INTO "properties"(name, price, address, model_type, status)
                VALUES (%s, %s, %s, %s, %s)
            """, properties)

        conn.commit()

        print("10 propiedades creadas con exito")

    except psycopg2.OperationalError as err:
        print("Error: ", err)

    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    seed()