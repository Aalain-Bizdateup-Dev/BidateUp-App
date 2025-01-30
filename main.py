from typing import List
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pandas as pd
from io import BytesIO
from db import get_db
from models import Person as PersonDB  
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Person(BaseModel):
    fname: str
    lname: str
    dept: str

class PersonResponse(Person):
    id: int

# GET all persons
@app.get("/", response_model=List[PersonResponse])
def get_all_persons(db: Session = Depends(get_db)):
    return db.query(PersonDB).all()

# POST add a person
@app.post("/addperson", response_model=PersonResponse)
def add_person(person: Person, db: Session = Depends(get_db)):
    new_person = PersonDB(**person.dict())  # Cleaner approach
    db.add(new_person)
    db.commit()
    db.refresh(new_person)
    return new_person

# DELETE a person
@app.delete("/deleteperson/{person_id}", response_model=PersonResponse)
def delete_person(person_id: int, db: Session = Depends(get_db)):
    find_person = db.query(PersonDB).filter(PersonDB.id == person_id).first()
    if not find_person:
        raise HTTPException(status_code=404, detail="Person not found")
    db.delete(find_person)
    db.commit()
    return find_person

# PUT update a person
@app.put("/updateperson/{person_id}", response_model=PersonResponse)
def update_person(person_id: int, person: Person, db: Session = Depends(get_db)):
    find_person = db.query(PersonDB).filter(PersonDB.id == person_id).first()
    if not find_person:
        raise HTTPException(status_code=404, detail="Person not found")
    
    find_person.fname = person.fname
    find_person.lname = person.lname
    find_person.dept = person.dept  

    db.commit()
    db.refresh(find_person)
    return find_person

# **UPLOAD EXCEL FILE & STORE IN DATABASE**
@app.post("/upload")
async def upload_excel(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Read file contents
        contents = await file.read()
        df = pd.read_excel(BytesIO(contents))

        # Validate required columns
        required_columns = {"fname", "lname", "dept"}
        if not required_columns.issubset(df.columns):
            raise HTTPException(status_code=400, detail=f"Invalid file format. Required columns: {required_columns}")

        # Convert DataFrame rows into a list of dictionaries
        records = df.to_dict(orient="records")
        existing_records = db.query(PersonDB).filter(PersonDB.fname.in_([r["fname"] for r in records]),
                                                    PersonDB.lname.in_([r["lname"] for r in records]),
                                                    PersonDB.dept.in_([r["dept"] for r in records])).all()

        # Check for duplicate records
        duplicate_records = []
        for record in records:
            if any((record["fname"] == er.fname and record["lname"] == er.lname and record["dept"] == er.dept) for er in existing_records):
                duplicate_records.append(record)

        if duplicate_records:
            raise HTTPException(status_code=400, detail=f"Duplicate records found: {duplicate_records}")

        # Upload new records
        new_records = [record for record in records if record not in duplicate_records]
        for record in new_records:
            new_person = PersonDB(**record)
            db.add(new_person)

        db.commit()
        return {"message": "File uploaded and data inserted successfully", "total_records": len(new_records)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))