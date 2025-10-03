import psycopg2
from faker import Faker
import random

def seed():
    fake = Faker()
    try: 
        conn = psycopg2.connect("dbname=real_state_db user=agent1 password=BestPass host=localhost port=5432")
        cursor = conn.cursor()
            
        properties = []

        for _ in range(10):
            properties.append((
                fake.street_name(),
                round(random.randint(1000000, 10000000), 2),
                fake.address(),
                random.choice(["house", "apartment", "office"]),
                random.choice(["available", "sold", "rented"])
            ))

        cursor.executemany("""
            INSERT INTO "properties"(name, price, address, model_type, status)
            VALUES (%s, %s, %s, %s, %s)
        """, properties)

        conn.commit()
        cursor.close()
        conn.close()

        print("10 propiedades creadas con exito")

    except psycopg2.OperationalError as err:
        print(err)

if __name__ == '__main__':
    seed()