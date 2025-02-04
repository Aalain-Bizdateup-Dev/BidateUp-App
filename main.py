from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import pandas as pd
import io

# Database Configuration
DATABASE_URL = "postgresql://postgres:Admin@localhost/proper_app"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Enable CORS for Frontend Access
origins = [
    "http://localhost:5173",
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
    employees = relationship("Employee", back_populates="department")
    questions = relationship("Question", back_populates="department")

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(Integer, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    department = relationship("Department", back_populates="employees")

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    department = relationship("Department", back_populates="questions")

# Create Tables on Startup
@app.on_event("startup")
def startup():
    Base.metadata.create_all(engine)

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
    department: str

class QuestionCreate(BaseModel):
    question: str
    answer: str
    department: str

# API to Add Employee
@app.post("/add_employee/")
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    try:
        # Check if department exists
        dept = db.query(Department).filter(Department.name == employee.department).first()
        if not dept:
            dept = Department(name=employee.department)
            db.add(dept)
            db.commit()
            db.refresh(dept)

        emp = Employee(
            batch_id=employee.batch_id, 
            name=employee.name, 
            email=employee.email, 
            phone_number=employee.phone_number, 
            department_id=dept.id
        )
        db.add(emp)
        db.commit()
        db.refresh(emp)

        return {"message": "Employee added successfully", "employee_id": emp.id}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# API to Add a Question
@app.post("/add_question/")
def add_question(question: QuestionCreate, db: Session = Depends(get_db)):
    dept = db.query(Department).filter(Department.name == question.department).first()
    if not dept:
        dept = Department(name=question.department)
        db.add(dept)
        db.commit()
        db.refresh(dept)

    new_question = Question(
        question=question.question, 
        answer=question.answer, 
        department_id=dept.id
    )
    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return {"message": "Question added successfully", "question_id": new_question.id}

# API to Get All Questions for a Department
@app.get("/get_questions/{department_name}")
def get_questions(department_name: str, db: Session = Depends(get_db)):
    dept = db.query(Department).filter(Department.name == department_name).first()
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")

    questions = db.query(Question).filter(Question.department_id == dept.id).all()
    return questions

# API to Get All Departments
@app.get("/get_all_departments")
def get_all_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()

# API to Upload CSV and Store Questions in Database
@app.post("/upload-csv/")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

        # Ensure correct CSV format
        if "question" not in df.columns or "answer" not in df.columns or "department" not in df.columns:
            return {"error": "CSV must contain 'question', 'answer', and 'department' columns"}

        for _, row in df.iterrows():
            # Ensure department exists
            dept = db.query(Department).filter(Department.name == row["department"]).first()
            if not dept:
                dept = Department(name=row["department"])
                db.add(dept)
                db.commit()
                db.refresh(dept)

            # Insert question into the database
            qa_entry = Question(
                question=row["question"], 
                answer=row["answer"], 
                department_id=dept.id
            )
            db.add(qa_entry)

        db.commit()
        return {"message": "CSV uploaded and questions stored successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
