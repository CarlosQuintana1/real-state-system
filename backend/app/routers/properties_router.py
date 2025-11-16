from fastapi import APIRouter
from app.crud.properties_crud import create_property, get_all_properties, get_property, update_property, delete_property
from app.schemas.user_schema import PropertySchema, PropertyResponse

router = APIRouter(
    prefix="/api/properties",
    tags=["Properties"]
)

@router.get("/", response_model=list[PropertyResponse])
async def read_properties(
    page: int = 1,
    limit: int = 10,
    type_f: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    location: str | None = None
):
    skip = (page - 1 ) * limit
    return get_all_properties(
        skip=skip,
        limit=limit,
        type_f=type_f,
        min_price=min_price,
        max_price=max_price,
        location=location
    )

@router.post("/")
async def write_property(property_data: PropertySchema):
    return create_property(property_data.model_dump())

@router.get("/{property_id}", response_model=PropertyResponse)
async def read_property(property_id: int):
    return get_property(property_id)

@router.put("/{property_id}", response_model=PropertyResponse)
async def update_property_data(property_id: int, property_data: PropertySchema):
    return update_property(property_id, property_data)

@router.delete("/{property_id}")
async def remove_property(property_id: int):
    return delete_property(property_id)