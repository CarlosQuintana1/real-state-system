from fastapi import FastAPI
from models.user import User, UserCreate, Property, Company

app = FastAPI()

@app.get("/")
async def root():
    return {"message" : "Welcome to Real State System"}

@app.post("/users", response_model=User)
async def create_user(user_data: UserCreate):
    user = User.model_validate(user_data.model_dump())
    return user

@app.post("/properties")
async def create_real_state(property_data: Property):
    return property_data

@app.post("/companies")
async def create_company(company_data: Company):
    return company_data