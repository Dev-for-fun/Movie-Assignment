from pydantic import BaseModel

class Movie(BaseModel):
    title : str
    genres : str
    year : int 
    Rating: float
    RottenTomato:int 
    id:int