# ARGenie Assignment

**Please make sure that you have installed dependencies**

### How to run both
- **for frontend:** npm run dev
- **for backend:** fastapi dev index.py



## Steps to run the project
1. Install Python and run pip install -r requirements.txt to install the dependencies
2. Install the frontend dependencies also using npm install
3. Create .env file( for guidance see .env.example file)
4. use fastapi dev index.py to run the server of project
5. use npm run dev to run the frontend

### For dummy data dump , uncomment the line 22 in index.py file and comment it after the dump

## Frontend  Endpoints
- **Endpoint:** `/card`
- It fetches all the movies and shows all the movies in card components

- **Endpoint:** `/`
- It fetches all the movies and shows all the movies in a table format

## Backend API Endpoints

### 1. Fetch movies with pagination 
- **Endpoint:** `/api/movies?page=1&pageSize=10`
- **Method:** GET
- **Description:** Fetches the movies according to the specified queries

### 2. Fetch all the movies exist in the database
- **Endpoint:** `/api/movies/all`
- **Method:** GET
- **Description:** Fetches all the movies in the database

### 3. Add a new movie to the database
- **Endpoint:** `/api/movies/add`
- **Method:** POST

### 4. Delete a movie using movieId
- **Endpoint:** `/api/movies/{movie_id}`
- **Method:** DELETE

### 5. Update a movie
- **Endpoint:** `/api/movies/{movie_id}`
- **Method:** PATCH