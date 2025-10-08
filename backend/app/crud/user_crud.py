from fastapi import HTTPException
from app.config.db import get_connection
from app.schemas.user_schema import UserSchema


def get_user(user_id: int) -> dict:
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, name, email FROM "user" WHERE id = %s
            """, (user_id,))
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail=f"User {user_id} not found")
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

def create_user(user: UserSchema):
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "user"(name, email) VALUES(%(name)s, %(email)s)
            """, user)
            conn.commit()

            return {"message": "User created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()

def update_user(user_id: int, user: UserSchema) -> dict:
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                UPDATE "user"
                SET name = %s,
                    email = %s
                WHERE id = %s
                RETURNING id, name, email;
            """, (user.name, user.email, user_id))
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
        return {"message": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()