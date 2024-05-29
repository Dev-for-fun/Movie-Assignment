import requests
from database.connection import movie_collection
import pandas as pd
from io import StringIO

async def handle_csv_dump():
    try:
        response =  requests.get("https://raw.githubusercontent.com/kromerm/adfdataflowdocs/master/sampledata/moviesDB.csv",stream=True)
        response.raise_for_status()
        print(1)
          # Read the CSV data into a pandas DataFrame
        df = pd.read_csv(StringIO(response.text))

        # Convert DataFrame to list of dictionaries
        data = df.to_dict(orient='records')

        result = movie_collection.insert_many(data)

        
        
    except Exception as e:
        print(e)