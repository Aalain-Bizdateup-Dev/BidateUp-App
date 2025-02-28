from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Text, BIGINT
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import pandas as pd
from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum
import io
from enum import Enum
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Optional
# Database Configuration
DATABASE_URL = "postgresql://postgres:Admin@localhost/ProperDb"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Enable CORS for Frontend Access
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Dependency for Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class EmployeeTypeEnum(str, Enum):
    Employee = "Employee"
    Consultant = "Consultant"

class Departments(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)

class Employees(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50), nullable=False, unique=True)  # Changed to String(50)
    email = Column(String(255), nullable=False, unique=True)
    department_id = Column(Integer, ForeignKey('departments.id', ondelete="SET NULL"), nullable=True)
    designation = Column(String(255), nullable=False)  # Removed unique=True for designation
    phone_number = Column(String(20), nullable=False, unique=True)  # Changed to String(20)
    name = Column(String(255), nullable=False)
    employee_type = Column(SQLAlchemyEnum(EmployeeTypeEnum), nullable=False)
    employee_status = Column(Boolean, default=True, nullable=False)
# Add Departments Code
@app.post("/departments")
def add_departments(name: str, db: Session = Depends(get_db)):
    db_departments = db.query(Departments).filter(Departments.name == name).first()
    
    if db_departments:
        raise HTTPException(detail="Department Already Exists", status_code=409)

    try:
     
        db_departments = Departments(name=name)
        db.add(db_departments)
        db.commit()  
        db.refresh(db_departments) 
        return db_departments
    except Exception as e:
        db.rollback()  
        raise HTTPException(detail="Something Went Wrong", status_code=500) from e

# Return Departments 
@app.get("/get-departments")
def get_departments(db: Session = Depends(get_db)):
    return db.query(Departments).all()


# Add Employee
@app.post("/add-employee")
def add_employee(employee: Employees, db: Session = Depends(get_db)):
    db_employee = db.query(Employees).filter(Employees.employee_id == employee.employee_id).first()
    if db_employee:
        raise HTTPException(detail="Employee Already Exists", status_code=409)
    try:
        db_employee = Employees(**employee.dict())
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        return db_employee
    except Exception as e:
        db.rollback()
        raise HTTPException(detail="Something Went Wrong", status_code=500) from e