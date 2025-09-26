from pydantic import BaseModel, EmailStr
from typing import Literal

class UserCreate(BaseModel):
	name: str
	email: EmailStr

class UserResponse(UserCreate):
	id: int | None = None

class PropertyCreate(BaseModel):
	price: float
	address: str
	model_type: str
	status: Literal["available", "sold", "rented"]
	
class PropertyResponse(PropertyCreate):
    id : int

class Company(BaseModel):
	id : int
	name: str
	agent : list[UserResponse]
	properties : list[PropertyResponse]
	
	@property
	def total_properties(self) -> int:
		return len(self.properties)
	#print(company.total_properties())