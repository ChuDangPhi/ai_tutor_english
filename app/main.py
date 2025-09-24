from fastapi import FastAPI

app = FastAPI(title="AI Beginner Tutor")

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/health")
def health():
    return {"status": "ok"}
