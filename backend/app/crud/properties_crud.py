from fastapi import HTTPException
from app.config.db import get_connection
from app.schemas.user_schema import PropertySchema

def get_all_properties():
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT name, price, address, model_type, status FROM properties;
            """)
            rows = cur.fetchall()
            if not rows:
                raise HTTPException(status_code=404, detail="No properties found")
            properties = [
                PropertySchema(
                    name = row[0],
                    price = float(row[1]),
                    address = row[2],
                    model_type= row[3],
                    status = row[4]
                )
                for row in rows
            ]
            return properties
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()