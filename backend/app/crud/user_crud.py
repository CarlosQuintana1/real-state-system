from fastapi import HTTPException
import traceback
from psycopg2 import errors
from app.config.db import get_connection
from app.schemas.user_schema import UserSchema
from app.utils.security import hash_password
#Ready

#Para sellers
def get_users(role: str | None = None) -> list[dict]:
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:

            if role:
                cur.execute("""
                    SELECT id, name, email, role
                    FROM "user"
                    WHERE role = %s
                    ORDER BY id ASC
                """, (role,))
            else:
                cur.execute("""
                    SELECT id, name, email, role
                    FROM "user"
                    ORDER BY id ASC
                """)

            rows = cur.fetchall()

            return [
                {"id": r[0], "name": r[1], "email": r[2], "role": r[3]}
                for r in rows
            ]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if conn:
            conn.close()

def get_user(user_id: int) -> dict:
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, name, email, role FROM "user" WHERE id = %s
            """, (user_id,))
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail=f"User {user_id} not found")
            return {
                "id": row[0],
                "name": row[1],
                "email": row[2],
                "role": row[3]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()
#Ready
def create_user(user: UserSchema):
    conn = None
    try:
        conn = get_connection()
        hashed_pwd = hash_password(user.password)
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "user"(name, email, password, role) 
                VALUES(%s, %s, %s, %s)
                RETURNING id, name, email, role;
            """, (user.name, user.email, hashed_pwd, user.role))
            conn.commit()

            return {"message": "User created successfully"}

    except Exception as e:
        traceback.print_exc()
        if isinstance(e, errors.UniqueViolation):
            raise HTTPException(status_code=409, detail=f"User {user.email} already exists")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()
#falta COALESCE maybe
def update_user(user_id: int, user: UserSchema) -> dict:
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                UPDATE "user"
                SET name = %s,
                    email = %s,
                    password = %s,
                    role = %s
                WHERE id = %s
                RETURNING id, name, email, role;
            """, (user.name, user.email, hash_password(user.password), user.role , user_id))
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail=f"User {user_id} not found")
            conn.commit()

            return {
                "id": row[0],
                "name": row[1],
                "email": row[2]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()
#Ready
def delete_user(user_id: int):
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                DELETE FROM "user" WHERE id = %s RETURNING id;
            """, (user_id,))
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail=f"User {user_id} not found")

            conn.commit()
        return {"message": f"User {user_id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()