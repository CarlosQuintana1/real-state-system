from fastapi import HTTPException
from app.config.db import get_connection
from app.schemas.user_schema import Company

def create_company(company : Company):
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "company"(name)
                VALUES(%(name)s)
            """, (company))
            conn.commit()

            return {"message": "Company created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()