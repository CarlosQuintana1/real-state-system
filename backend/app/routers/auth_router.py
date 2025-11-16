from fastapi import APIRouter, HTTPException
from app.crud.auth_crud import login_user
from app.schemas.auth_schema import TokenResponse, LoginSchema

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)

@router.post("/login", response_model=TokenResponse)
async def login(data: LoginSchema):
    try:
        return login_user(data.email, data.password)
    except HTTPException as e:
        raise HTTPException(status_code=401, detail=f"Incorrect username or password. Error: {str(e)}")