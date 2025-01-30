from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

class Person(BaseModel):
    id: int
    fname: str
    lname: str
    ismale: bool

@app.get("/person/{person_id}")
def get_person(person_id: int):
    return {"person_id": person_id}

@app.post("/addperson")
def add_person(person: Person):
    return {
        "id": person.id,
        "fname": person.fname,
        "lname": person.lname,
        "ismale": person.ismale
    }
