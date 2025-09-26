from sqlalchemy import Column, Integer, String, Float, Enum
from sqlalchemy.orm import declarative_base
from app.config.db import Base
import enum

class User(Base):
	__tablename__ = "users"
	
	id = Column(Integer, primary_key=True, index=True, autoincrement=True)
	name = Column(String, nullable=False)
	email = Column(String, unique=True, nullable=False)

class PropertyStatus(str, enum.Enum):
	available = "available"
	sold = "sold"
	rented = "rented"

class Property(Base):
	__tablename__ = "properties"

	id = Column(Integer, primary_key=True, index=True, autoincrement=True)
	price = Column(Float, nullable=False)
	address = Column(String, nullable=False)
	model_type = Column(String, nullable=False)
	status = Column(Enum(PropertyStatus), nullable=False)