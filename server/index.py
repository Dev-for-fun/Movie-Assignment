from fastapi import FastAPI
from routes.movie import movie
from dotenv import load_dotenv,dotenv_values
from database.config import handle_csv_dump



app = FastAPI()
load_dotenv()


@app.on_event("startup")
async def on_startup():
    await handle_csv_dump()


app.include_router(movie)

@app.get("/api")
def he():
    return {"hello world"}
