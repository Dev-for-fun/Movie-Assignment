from fastapi import APIRouter,Request,HTTPException
from database.connection import movie_collection
from schemas.movie import movieEntity, moviesEntity
from bson import ObjectId
from models.movie import Movie
import random

movieRouter = APIRouter()

@movieRouter.get("/api/movies")
async def handleGetMovies(request:Request,page:int=0,pageSize:int= 10)->list[Movie]:
    try:
        response_data = movie_collection.find({}).skip(page*pageSize).limit(pageSize)
        
        movies = moviesEntity(response_data)

        return [
            Movie(**movie) for movie in movies
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occured while fetching movies -- {e}")
    
@movieRouter.get("/api/movies/all")
async def handleGetAllMovies()->list[Movie]:
    try:
        response_data = movie_collection.find({})
        
        movies = moviesEntity(response_data)

        return [
            Movie(**movie) for movie in movies
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occured while fetching movies -- {e}")


@movieRouter.post("/api/movies/add")
async def handleAddMovies(request:Request)->Movie:
    request_body = await request.json()
    
    if("title" not in request_body or "Rating" not in request_body or "RottenTomato" not in             request_body  or "year" not in request_body or "genres" not in request_body):
        raise HTTPException(400,detail="Please enter all the fields")
    
    try:
        large_int = random.randint(1, 9223372036854775807)

        movie_dict = dict(**request_body,_id=large_int)

        inserted_movie = movie_collection.insert_one(movie_dict)
        response_data = movie_collection.find_one({"_id":inserted_movie.inserted_id})
        movies = movieEntity(response_data)
        return Movie(**movies)
    except Exception as e:
        raise HTTPException(status_code=500, detail= f"Error occured while inserting the movie: {e}")

    

@movieRouter.delete("/api/movies/{movie_id}")
async def handleDeleteMovie(request:Request,movie_id:int):
    try:
        movie_collection.delete_one({"_id":movie_id})
        return {"Success":"Movie deleted successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred while deleting the movie: {e}")

@movieRouter.patch("/api/movies/{movie_id}")
async def handleUpdateMovie(request:Request,movie_id:int):
    try:
        request_body = await request.json()
        updated_movie = dict(request_body)
        # Update the movie document in the collection
        movie_collection.find_one_and_update({"_id": movie_id}, {"$set":updated_movie})
        movie= movie_collection.find_one({"_id": movie_id})
        return movieEntity(movie)
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Error occurred while updating the movie: {e}")
