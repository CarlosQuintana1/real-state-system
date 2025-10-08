import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="real_state_db",
        user="agent1",
        password="BestPass",
        host="db",
        port="5432"
    )