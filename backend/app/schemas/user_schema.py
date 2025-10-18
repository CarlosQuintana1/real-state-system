from pydantic import BaseModel, EmailStr
from typing import Literal, Optional

class UserSchema(BaseModel):
	name: str
	email: EmailStr
	role: Literal["client", "seller"]

class UserResponse(UserSchema):
	id: int | None = None

class PropertySchema(BaseModel):
	name: str
	price: float
	address: str
	model_type: str
	status: Literal["available", "sold", "rented"]
	seller_id: Optional[int] = None
	
class PropertyResponse(PropertySchema):
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