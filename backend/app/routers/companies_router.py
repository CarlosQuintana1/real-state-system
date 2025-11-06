from fastapi import APIRouter
from app.schemas.user_schema import Company
from app.crud.companies_crud import create_company

router = APIRouter(
    prefix="/api/companies",
    tags=["Companies"]
)

@router.post("/")
async def write_company(company: Company):
    return create_company(company)