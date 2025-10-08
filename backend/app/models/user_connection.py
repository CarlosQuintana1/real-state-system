"""Considerando la carpeta models"""
import psycopg2

class UserConnection:
    conn = None

    def __init__(self):
        try:
            self.conn = psycopg2.connect("dbname=real_state_db user=agent1 password=BestPass host=localhost port=5432")
            pass
        except psycopg2.OperationalError as err:
            print(err)
            self.conn.close()

    def write(self, data):
        with self.conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "user"(name, email) VALUES(%(name)s, %(email)s)
            """, data)
        self.conn.commit()

    def writeProperties(self, data):
        with self.conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "properties"(name, price, address, model_type, status) VALUES(%(name)s, %(price)s, %(address)s, %(model_type)s, %(status)s)
            """, data)
        self.conn.commit()

    def __def__(self):
        self.conn.close()