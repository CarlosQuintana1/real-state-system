from fastapi import FastAPI
from models.user import User

app = FastAPI()

@app.get("/")
async def root():
    return {"message" : "Welcome to Real State System"}

@app.post("/users")
async def create_user(user_data: User):
    return user_data