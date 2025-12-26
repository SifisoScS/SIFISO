from fastapi import FastAPI
from pydantic import BaseModel
from runner import run_python_code

app = FastAPI()

class CodeRequest(BaseModel):
    code: str

@app.post("/run")
def run_code(request: CodeRequest):
    return run_python_code(request.code)
