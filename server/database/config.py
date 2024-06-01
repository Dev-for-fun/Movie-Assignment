import requests
from database.connection import movie_collection
import pandas as pd
from io import StringIO
from fastapi import HTTPException

async def handle_csv_dump():
    try:
        response =  requests.get("https://raw.githubusercontent.com/kromerm/adfdataflowdocs/master/sampledata/moviesDB.csv",stream=True)
        response.raise_for_status()
          # Read the CSV data into a pandas DataFrame
        df = pd.read_csv(StringIO(response.text))

        # Convert DataFrame to list of dictionaries
        data = df.to_dict(orient='records')

        # Transform the data to use 'movie' as '_id'
        for record in data:
          if 'movie' in record:
            record['_id'] = record.pop('movie')

        movie_collection.insert_many(data)

        
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred while dumping the movie data: {e}")