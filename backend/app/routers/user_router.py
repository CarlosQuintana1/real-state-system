from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.crud.user_crud import get_user, create_user, update_user, delete_user
from app.schemas.user_schema import UserSchema, UserResponse

router = APIRouter(
    prefix="/api/user",
    tags=["User"]
)

@router.get("/{user_id}", response_model=UserResponse)
async def read_user(user_id: int, current_user=Depends(get_current_user)): # noqa: F841
    return get_user(user_id)

@router.post("/")
async def write_user(user: UserSchema):
    return create_user(user)

@router.put("/{user_id}", response_model=UserSchema)
async def update_user_data(user_id: int, user: UserSchema):
    return update_user(user_id, user)

@router.delete("/{user_id}")
async def remove_user(user_id: int):
    return delete_user(user_id)