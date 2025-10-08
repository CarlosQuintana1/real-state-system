from fastapi import APIRouter
from app.crud.user_crud import get_user, create_user, update_user, delete_user
from app.schemas.user_schema import UserSchema

router = APIRouter(
    prefix="/api/user",
    tags=["User"]
)

@router.get("/{user_id}", response_model=UserSchema)
async def read_user(user_id: int):
    return get_user(user_id)

@router.post("/")
async def write_user(user: UserSchema):
    return create_user(user.model_dump())

@router.put("/{user_id}", response_model=UserSchema)
async def update_user_data(user_id: int, user: UserSchema):
    return update_user(user_id, user)

@router.delete("/{user_id}")
async def remove_user(user_id: int):
    return delete_user(user_id)