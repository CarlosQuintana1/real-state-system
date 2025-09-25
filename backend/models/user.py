from pydantic import BaseModel, EmailStr
from typing import Literal

class User(BaseModel):
	name: str
	email: EmailStr

class Property(BaseModel):
	id: int
	price: float
	address: str
	model_type: str
	status: Literal["available", "sold", "rented"]

class Company(BaseModel):
	id : int
	name: str
	agent : list[User]
	properties : list[Property]
	
	@property
	def total_properties(self) -> int:
		return len(self.properties)
	#print(company.total_properties())