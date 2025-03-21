from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Text, BIGINT
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import pandas as pd
import io
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Optional
# Database Configuration
DATABASE_URL = "postgresql://postgres:Admin@localhost/proper_app"
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

# Database Models
class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    role = Column(String, unique=True, index=True)
    employees = relationship("Employee", back_populates="department")                                       
    questions = relationship("Question", back_populates="department")                                       
    employee_kpi = relationship("Question", back_populates="department")                                       
class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(BIGINT, nullable=False)
    department_name = Column(String, nullable=False)
    user_role = Column(String, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    department = relationship("Department", back_populates="employees")
 
    
class Question(Base):
    __tablename__ = "employee_kpi"
    id = Column(Integer, primary_key=True, index=True)
    questions = Column(Text, nullable=False)
    answers = Column(Text, nullable=False)
    month = Column(Text, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    department = relationship("Department", back_populates="employee_kpi")


# Dependency for Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Models
class EmployeeCreate(BaseModel):
    batch_id: int
    name: str
    email: EmailStr  
    phone_number: int
    user_role: str
    department_name: str

class QuestionCreate(BaseModel):
    question: str
    answer: str
    department: str

class DepartmentCreate(BaseModel):
    name: str
    role: str
class EmployeeUpdateModel(BaseModel):
    name:str
    email:EmailStr
    phone_number:int
    
# API to Add Employee
@app.post("/add_employee/")
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    try:
        dept = db.query(Department).filter(Department.name == employee.department_name).first()
        if dept is None :
            raise HTTPException(status_code=404, detail=f"Department '{employee.department_name}' not found")
        role_check = db.query(Department).filter(Department.role == employee.user_role).first()
        
        if role_check is None : 

            raise HTTPException(status_code=404, detail=f"Role '{employee.user_role}' not found")
        emp = Employee(
            batch_id=employee.batch_id,
            name=employee.name,
            email=employee.email,
            phone_number=employee.phone_number,
            user_role=employee.user_role,
            department_id=dept.id,
            department_name = employee.department_name
        )
        db.add(emp)
        db.commit()
        db.refresh(emp)
    
        return {"message": "Employee added successfully", "employee_id": emp.id}

    except HTTPException as he:
        raise he
    except Exception as e:

        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


# Api To Get Departments
@app.get("/get_departments")
async def get_All_departments(db: Session = Depends(get_db)):
    dept = db.query(Department).all()
    if dept is None:
        raise HTTPException(status_code = 404, message= "Departments Not Found") 
    
    return {
        "status": "success",
        "code":200,
        "dept": dept
    }



# API to Get All Departments
@app.get("/get_all_departments")
def get_all_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()

# API to Upload CSV and Store Questions in Database
@app.post("/upload-csv/")
async def upload_csv(files: List[UploadFile] = File(...), db: Session = Depends(get_db)):
    try:
        for file in files:
            contents = await file.read()
            df = pd.read_csv(io.StringIO(contents.decode("utf-8")))


            required_columns = ["question", "answer", "month", "department", "emp"]
            for col in required_columns:
                if col not in df.columns:
                    raise HTTPException(status_code=400, detail=f"CSV must contain '{col}' column")

            # Process each row in the CSV file
            for _, row in df.iterrows():
                # Find employee by name
                employee_name = db.query(Employee).filter(Employee.name == row['emp']).first()
                if not employee_name:
                    raise HTTPException(status_code=404, detail=f"Employee '{row['emp']}' not found")
                
                # Find department by name, or create it if it doesn't exist
                dept = db.query(Department).filter(Department.name == row["department"]).first()
                if not dept:
                    dept = Department(name=row["department"])
                    db.add(dept)
                    db.commit()  # Commit to get the ID of the new department
                    db.refresh(dept)  # Refresh to get the latest data

                # Create a Question entry
                qa_entry = Question(
                    questions=row["question"],
                    answers=row["answer"],
                    month=row["month"],
                    department_id=dept.id,
                    employee_id=employee_name.id
                )
                db.add(qa_entry)

            # Commit after processing all rows in a file
            db.commit()

        return {"message": f"{len(files)} CSV file(s) uploaded and questions stored successfully."}

    except Exception as e:
        db.rollback()  # Rollback in case of any error
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


# Create Department Code
@app.post("/create-dept")
def create_dept(depart: DepartmentCreate, db: Session = Depends(get_db)):
    try:
        find_dept = db.query(Department).filter(
            (Department.name == depart.name) | (Department.role == depart.role)
        ).first()
        if find_dept:
            return {"message": "Department with the same name or role already exists", "status_code": 403}
        new_dept = Department(name=depart.name, role=depart.role)
        db.add(new_dept)
        db.commit()
        db.refresh(new_dept)
        return {"message": "Department created successfully", "status_code": 200,}
    except Exception as e:
        db.rollback() 
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}") 
    
# Get All Employeess Api    
@app.get("/get_all_employees")
def get_all_employees(db: Session = Depends(get_db)):
   try:
       data = db.query(Employee).all()
       if data is None:
        return {"message": "No Data Found", "status_code": 404}
       return {"message": "Data Fetched Successfully", "status_code": 200, "data": data}
   except SQLAlchemyError as e:
       raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
   except Exception as e:
       return  {"message": "Failed To fetch Data", "status_code":403, "error": str(e)}  
# Get Depart Code
@app.get("/get-dept")
def get_dept(db: Session = Depends(get_db)):
    try:
     data = db.query(Department).all()
     return {"message": "Departments fetched successfully", "status_code": 200, "data": data}
    except Exception as e:
        return {"message": "Failed To fetch Data", "status_code":403, "error": str(e)}

@app.put("/update-specific-emp/{emp_id}")
def update_emp(emp_id:  int, employee: EmployeeUpdateModel, db: Session = Depends(get_db)):
    try:
        data = db.query(Employee).filter(Employee.batch_id == emp_id).first()
        if not data:
            raise HTTPException(status_code=404, detail="Employee not found")
        data.name = employee.name
        data.email = employee.email
        data.phone_number = employee.phone_number
        
        db.commit()
        db.refresh(data)
        
        return {"message": "Employee updated successfully", "status_code": 200, "data": data}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
        
# Get Employess Department Api
@app.get("/get-specific-dept/{dept_name}")
def get_dept(dept_name:str,db: Session = Depends(get_db)):
    try:
     data = db.query(Department).filter(Department.name == dept_name).first()
     if data:
         response = db.query(Employee).filter(Employee.department_id == data.id).all()
         return {"message": "Departments Employees fetched successfully", "status_code": 200, "data": response}
    except Exception as e:
        return {"message": "Failed To fetch Data", "status_code":403, "error": str(e)}
# Get Specific Employee For Modal
@app.get("/get-specific-emp/{emp_id}")
def get_specific_emp(emp_id: int, db: Session = Depends(get_db)):
    try:
        dept = db.query(Employee).filter(Employee.batch_id == emp_id).first()
        if  dept is None:
            raise HTTPException(message="No Data Found", status_code = 404)
        return {"message":"Data Found SuccessFully", "status_code":200, "data":dept}
    except HTTPException as e:
        raise HTTPException (message="No Data Found", status_code = 404)

@app.get("/get_data_from_sheet/{name}")
async def get_data(name: str, db: Session = Depends(get_db)):
    try:
        # Join Employee and Question tables based on employee_id
        data = db.query(Question).join(Employee).filter(Employee.name == name).all()
        
        # Alternatively, you can filter based on the month if required
        # data = db.query(Question).filter(Question.month == month).all()
        
        return data
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}


# get all empployees
