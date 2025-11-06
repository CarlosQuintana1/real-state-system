from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.user_router import router as user_router
from app.routers.properties_router import router as properties_router
from app.routers.companies_router import router as companies_router
from app.routers.auth_router import router as auth_router

app = FastAPI(
    title="Real Estate API",
    description="API for Real Estate System",
    version="0.8.0"
)

origins = [
    "http://localhost:5173/" #agregar debajo la direccion de la nube
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(properties_router)
app.include_router(companies_router)

"""
@app.get("/")
async def root():
    conn_user
    return {"message" : "Welcome to Real State System"}

#property CRUD
@app.post("/api/properties/insert")
async def create_real_estate(property_data: PropertySchema):
    conn_user.writeProperties(property_data.model_dump())

@app.get("/api/properties/{id}", response_model=PropertySchema)
async def get_property(id: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            SELECT name, price, address, model_type, status
            FROM properties
            WHERE id = %s;
        , (id,))

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
        
"""