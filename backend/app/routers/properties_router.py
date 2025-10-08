from fastapi import APIRouter
from app.crud.properties_crud import get_all_properties
from app.schemas.user_schema import PropertySchema

router = APIRouter(
    prefix="/api/properties",
    tags=["Properties"]
)

@router.get("/", response_model=list[PropertySchema])
async def read_properties():
    return get_all_properties()