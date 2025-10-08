import psycopg2
from fastapi import FastAPI, HTTPException
from typing import List
from app.schemas.user_schema import UserSchema, PropertySchema, Company
from app.models.user_connection import UserConnection
from app.config.db import get_connection

app = FastAPI()
conn_user = UserConnection()

@app.get("/")
async def root():
    conn_user
    return {"message" : "Welcome to Real State System"}

#user CRUD
@app.post("/api/user/insert")
async def create_user(user: UserSchema):
    conn_user.write(user.model_dump())

@app.get("/api/user/{id}", response_model=UserSchema)
async def get_user(id: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT name, email 
            FROM "user" 
            WHERE id = %s
        """, (id,))

        row = cursor.fetchone()

        cursor.close()
        conn.close()

        if row is None:
            raise HTTPException(status_code=404, detail="User not found")

        return UserSchema(
            name = row[0],
            email = row[1]
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/user/{id}")
async def remove_user(id: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            DELETE FROM "user" WHERE id = %s RETURNING id;
        """, (id,))

        row = cursor.fetchone()

        conn.commit()
        cursor.close()
        conn.close()       

        if row is None:
            raise HTTPException(status_code=404, detail=f"User {id} not found")
        
        return {"message": f"User {id} deleted successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#property CRUD
@app.post("/api/properties/insert")
async def create_real_estate(property_data: PropertySchema):
    conn_user.writeProperties(property_data.model_dump())

@app.get("/api/properties", response_model=List[PropertySchema])
async def get_properties():
    try: 
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT name, price, address, model_type, status FROM properties;')
        rows = cursor.fetchall()

        properties = [
            PropertySchema(
                name = row[0],
                price = float(row[1]),
                address = row[2],
                model_type = row[3],
                status = row[4]
            )
            for row in rows
        ]

        cursor.close()
        conn.close()

        return properties
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/api/properties/{id}", response_model=PropertySchema)
async def get_property(id: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT name, price, address, model_type, status
            FROM properties
            WHERE id = %s;
        """, (id,))

        row = cursor.fetchone()

        cursor.close()
        conn.close()

        if row is None:
            raise HTTPException(status_code=404, detail=f"Property {id} not found")
        
        return PropertySchema(
            name=row[0],
            price=float(row[1]),
            address=row[2],
            model_type=row[3],
            status=row[4]
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/properties/{id}")
async def remove_property(id: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM properties WHERE id = %s RETURNING id;", (id,))
        row = cursor.fetchone()

        conn.commit()
        cursor.close()
        conn.close()

        if row is None:
            raise HTTPException(status_code=404, detail=f"Property {id} not found")        

        return {"message": f"Property {id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#company CRUD
@app.post("/api/companies/insert")
async def create_company(company_data: Company):
    return company_data 