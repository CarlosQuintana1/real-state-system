from fastapi import HTTPException
from pydantic import EmailStr
from app.config.db import get_connection #Conexión a la base de datos
from app.utils.security import verify_password #hashed del password
from app.core.security_user import create_access_token #creación del token pwd
from datetime import timedelta


def login_user(email: EmailStr, password: str) -> dict:
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, name, email, password, role
                FROM "user"
                WHERE email = %s;
            """, (email,))

            user = cur.fetchone()

            if not user:
                raise HTTPException(status_code=401, detail="User not found")

            if not verify_password(password, user[3]):
                raise HTTPException(status_code=401, detail="Invalid credentials")

            token = create_access_token(
                data={"sub": user[2], "id": user[0], "role": user[4]},
                expires_delta=timedelta(minutes=60)
            )

            return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()