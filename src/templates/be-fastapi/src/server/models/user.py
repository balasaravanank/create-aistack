from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    """Base user schema with shared fields."""
    email: str
    name: str


class UserCreate(UserBase):
    """Schema for creating a new user."""
    password: str


class UserResponse(UserBase):
    """Schema for returning user data (no password)."""
    id: int

    model_config = {"from_attributes": True}


class User(UserBase):
    """Full user model with all fields."""
    id: int
    hashed_password: str

    model_config = {"from_attributes": True}
