from pymongo import MongoClient
import os
from fastapi import HTTPException
try:

    conn = MongoClient(os.getenv("MONGO_URI"))              

    db = conn["movies"]
    movie_collection = db["movies"]
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error occurred while making the connection to the database: {e}")