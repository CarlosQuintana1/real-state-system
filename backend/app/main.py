from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserResponse, UserCreate, PropertyCreate, Company
from app.models.models import User
from app.config.init_db import get_db

app = FastAPI()

@app.get("/")
async def root():
    return {"message" : "Welcome to Real State System"}

#create user
@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

#Get all users
@app.get("/users",)
async def all_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.post("/properties")
async def create_real_state(property_data: PropertyCreate):
    return property_data

@app.post("/companies")
async def create_company(company_data: Company):
    return company_data