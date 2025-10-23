from pydantic import BaseModel, EmailStr
from typing import Literal, Optional
#Ready
class UserSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Literal["client", "seller"]
#Ready
class UserResponse(BaseModel):
    id: int | None = None
    name: str
    email: EmailStr
    role: Literal["client", "seller"]
#Ready
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
    agent : list[UserResponse] | None = None
    properties : list[PropertyResponse] | None = None

    @property
    def total_properties(self) -> int:
        return len(self.properties)