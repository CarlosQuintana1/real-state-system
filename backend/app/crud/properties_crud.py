from fastapi import HTTPException
from app.config.db import get_connection
from app.schemas.user_schema import PropertySchema, PropertyResponse

#Agregar lógica para que se asigne el id del vendedor
def create_property(property_data: PropertySchema):
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "properties"(name, price, address, model_type, status)
                VALUES(%(name)s, %(price)s, %(address)s, %(model_type)s, %(status)s)
            """, (property_data))
            conn.commit()

            return {"message": "Property created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()

def get_all_properties(skip: int = 0, limit: int = 10):
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, name, price, address, model_type, status, seller_id 
                FROM properties
                ORDER BY id
                OFFSET %s LIMIT %s
            """, (skip, limit))
            rows = cur.fetchall()

            if not rows:
                raise HTTPException(status_code=404, detail="No properties found")
            
            properties = [
                PropertyResponse(
                    id = row[0],
                    name = row[1],
                    price = float(row[2]),
                    address = row[3],
                    model_type= row[4],
                    status = row[5],
                    seller_id = row[6]
                )
                for row in rows
            ]

            return properties
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()

def get_property(property_id: int) -> dict:
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, name, price, address, model_type, status
                FROM properties
                WHERE id = %s
            """, (property_id,))
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail=f"Property {property_id} not found")
            return {
                "id": row[0],
                "name": row[1],
                "price": float(row[2]),
                "address": row[3],
                "model_type": row[4],
                "status": row[5]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()

def update_property(property_id: int, property_data: PropertySchema) -> PropertyResponse:
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                UPDATE "properties"
                SET name = %s,
                    price = %s,
                    address = %s,
                    model_type = %s,
                    status = %s,
                    seller_id = %s
                WHERE id = %s
                RETURNING id, name, price, address, model_type, status, seller_id;
            """, (
                property_data.name, 
                property_data.price, 
                property_data.address, 
                property_data.model_type, 
                property_data.status, 
                property_data.seller_id,
                property_id
            ))
            
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail=f"Property {property_id} not found")
            conn.commit()

            return {
                "id": row[0],
                "name": row[1],
                "price": float(row[2]),
                "address": row[3],
                "model_type": row[4],
                "status": row[5],
                "seller_id": row[6]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()

def delete_property(property_id: int):
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("""
                DELETE FROM "properties" WHERE id = %s RETURNING id;
            """, (property_id,))
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail=f"Property {property_id} not found")
            
            conn.commit()
        return {"message": f"Property {property_id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()