from fastapi import APIRouter,Request,HTTPException
from database.connection import movie_collection
from schemas.movie import movieEntity, moviesEntity
from bson import ObjectId

movie = APIRouter()

@movie.get("/api/movies")
async def handleGetMovies(request:Request):
    try:
        response_data = movie_collection.find({})
        
        movies = moviesEntity(response_data)

        return movies
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occured while fetching movies -- {e}")


@movie.post("/api/movies/add")
async def handleAddMovies(request:Request):
    request_body = await request.json()
    
    if("title" not in request_body or "Rating" not in request_body or "RottenTomato" not in request_body or "movie" not in request_body or "year" not in request_body or "genres" not in request_body):
        raise HTTPException(400,detail="Please enter all the fields")
    
    try:
        movie_dict = dict(request_body)

        inserted_movie = movie_collection.insert_one(movie_dict)
        movie = movie_collection.find_one({"_id":inserted_movie.inserted_id})

        return movieEntity(movie)
    except Exception as e:
        raise HTTPException(status_code=500, detail= f"Error occured while inserting the movie: {e}")

    

@movie.delete("/api/movies/{movie_id}")
async def handleDeleteMovie(request:Request,movie_id:str):
    try:
        movie_collection.delete_one({"_id":ObjectId(movie_id)})
        return {"Success":"Movie deleted successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred while deleting the movie: {e}")

@movie.patch("/api/movies/{movie_id}")
async def handleUpdateMovie(request:Request,movie_id:str):
    try:
        request_body = await request.json()
        updated_movie = dict(request_body)
        # Update the movie document in the collection
        movie_collection.find_one_and_update({"_id": ObjectId(movie_id)}, {"$set":updated_movie})
        movie= movie_collection.find_one({"_id": ObjectId(movie_id)})
        return movieEntity(movie)
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Error occurred while updating the movie: {e}")
