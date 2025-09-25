from pydantic import BaseModel, EmailStr
from typing import Literal

class UserData(BaseModel):
	name: str
	email: EmailStr

class UserCreate(UserData):
	pass

class User(UserData):
	id: int | None = None

class Property(BaseModel):
	# id: int <- cambiar a un id dinamico aleatorio
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