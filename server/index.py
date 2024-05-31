from fastapi import FastAPI
from routes.movie import movieRouter
from dotenv import load_dotenv,dotenv_values
from database.config import handle_csv_dump
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
load_dotenv()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# @app.on_event("startup")
# async def on_startup():
#     await handle_csv_dump()


app.include_router(movieRouter)

@app.get("/api")
def he():
    return {"hello world"}
