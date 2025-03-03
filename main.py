from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.exc import SQLAlchemyError
from typing import List

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

# Models
class Departments(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)

class Employees(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    department_name = Column(Integer, ForeignKey('departments.id', ondelete="SET NULL"), nullable=True)
    designation = Column(String(255), nullable=False)
    phone_number = Column(String(20), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    employee_type = Column(String(255), nullable=False)
    employee_status = Column(Boolean, default=True, nullable=False)

# Pydantic Model
class CreateEmployee(BaseModel):
    employee_id: str
    email: EmailStr
    department_name: str
    designation: str
    phone_number: str
    name: str
    employee_type: str
    employee_status: bool = True

class CreateDept(BaseModel):
    name: str
# Add Departments Code
@app.post("/add-departments")
def add_departments(department: CreateDept, db: Session = Depends(get_db)):
    db_departments = db.query(Departments).filter(Departments.name == department.name).first()
    
    if db_departments:
        return {"message":"Department Already Exists","status_code": 400}

    try:
        db_departments = Departments(name=department.name)
        db.add(db_departments)
        db.commit()
        db.refresh(db_departments)
        return {"message": "Department Added Successfully","status_code": 200}
    
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(detail="Database Error: " + str(e), status_code=500) from e

# Return Departments
@app.get("/get-departments")
def get_departments(db: Session = Depends(get_db)):
    return db.query(Departments).all()

# Add Employee
@app.post("/add-employee")
def add_employee(employee: CreateEmployee, db: Session = Depends(get_db)):
    # Check if employee already exists
    db_employee = db.query(Employees).filter(Employees.employee_id == employee.employee_id).first()
    if db_employee:
        raise HTTPException(detail="Employee Already Exists", status_code=400)

    # Convert department_name (string) to department_id (integer)
    db_dept = db.query(Departments).filter(Departments.name ==  employee.department_name).first()
    if not db_dept:
        raise HTTPException(detail=f"Department '{employee.department_name}' does not exist", status_code=400)

    # Now use department_id instead of department_name
    try:
        db_employee = Employees(
            employee_id=employee.employee_id,
            email=employee.email,
            department_name=db_dept.id,  # Store department_id, not department_name
            designation=employee.designation,
            phone_number=employee.phone_number,
            name=employee.name,
            employee_type=employee.employee_type,
            employee_status=employee.employee_status
        )
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        return {"message": "Employee Added Successfully", "status_code": 200}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(detail="Database Error: " + str(e), status_code=500) from e
    except Exception as e:
        db.rollback()
        raise HTTPException(detail="Something Went Wrong", status_code=500) from e
    

@app.get("/dept/{dept_name}")
def get_employee_by_dept(dept_name: str, db: Session = Depends(get_db)):
    db_check =  db.query(Departments).filter(Departments.name == dept_name).first()
    db_employee = db.query(Employees).filter(Employees.department_name == db_check.id).all()
    return db_employee