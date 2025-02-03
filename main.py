from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import sessionmaker, relationship, Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import IntegrityError  # Added for error handling
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
import io
import pandas as pd
# Database setup
DATABASE_URL = "postgresql://postgres:Admin@localhost/proper_app"

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def create_tables():
    Base.metadata.create_all(engine)
class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

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
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    department = relationship("Department", back_populates="questions")

Department.employees = relationship("Employee", back_populates="department")
Department.questions = relationship("Question", back_populates="department")


app = FastAPI()


class EmployeeCreate(BaseModel):
    batch_id:int
    name: str
    email: EmailStr  
    phone_number: int
    department: str

class QuestionCreate(BaseModel):
    question: str
    answer: str
    department: str
class CSVData(Base):
    __tablename__ = 'csv_data'
    id = Column(Integer, primary_key=True)
    Questions = Column(String)
    ans = Column(String)
# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/add_employee/")
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    try:
        # Check if department exists
        dept = db.query(Department).filter(Department.name == employee.department).first()
        if not dept:
            # Create new department if not exists
            dept = Department(name=employee.department)
            db.add(dept)
            db.commit()
            db.refresh(dept)  # Ensure department ID is available

        # Add employee with department
        emp = Employee(batch_id = employee.batch_id,  name=employee.name, email=employee.email, phone_number=employee.phone_number, department_id=dept.id,)
        db.add(emp)
        
        try:
            db.commit()
            db.refresh(emp)
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Email already in use")

        return {"message": "Employee added successfully", "employee_id": emp.id}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.post("/add_question/")
def add_question(question: QuestionCreate, db: Session = Depends(get_db)):
    dept = db.query(Department).filter(Department.name == question.department).first()
    if not dept:
        dept = Department(name=question.department)
        db.add(dept)
        db.commit()
        db.refresh(dept)
    
    new_question = Question(question=question.question, answer=question.answer, department_id=dept.id)
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

class QuestionAnswer(Base):
    __tablename__ = "questions_answers"
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))
    department = relationship("Department", back_populates="questions")
@app.post("/upload-csv/")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

    if "Questions" not in df.columns or "ans" not in df.columns:
        return {"error": "CSV must contain 'question' and 'answer' columns"}

    for _, row in df.iterrows():
        qa_entry = QuestionAnswer(question=row["Questions"], answer=row["ans"])
        db.add(qa_entry)

    db.commit()
    return {"message": "CSV uploaded and questions stored successfully"}