from db import Base, engine
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text


def create_tables():
    Base.metadata.create_all(engine)
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, nullable=False)
    fname = Column(String, nullable=False)
    lname = Column(String, nullable=False)
    ismale = Column(Boolean, nullable=False)