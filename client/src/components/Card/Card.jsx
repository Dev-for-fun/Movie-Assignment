import React, { useState } from 'react'
import "./Card.css"
import {Link} from 'react-router-dom'

const Card = ({movie,setMovies,index,movies}) => {

  const [error, setError] = useState(null)

  const API_URL = 'https://movie-assignment.onrender.com/api/movies';

  const handleDeleteRow = async(index,movie)=>{
    try{

      await fetch(`${API_URL}/${movie.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setMovies(movies.filter((_, i) => i !== index));
    }
    catch(err){
      setError(err);
    }
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="app__card">
        <div className="card" style={{width: "18rem"}}>
        <img src="https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg" className="card-img-top" alt="..."/>
        <div className="card-body">
            <h3 className="card-title">{movie.title}</h3>
            <p className="card-text"><span>Genres:</span> {movie.genres}</p>
            <p className="card-text"><span>Year:</span> {movie.year}</p>
            <p className="card-text"><span>Ratings:</span> {movie.Rating}</p>
            <p className="card-text"><span>RottenTomato:</span> {movie.RottenTomato}</p>
            <div className="card-buttons">
              <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteRow(index,movie)}>Delete</button>
              <button type="button" className="btn btn-outline-success">

              <Link to={`/card/${movie.id}`} >Edit</Link>
              </button>
            </div>

        </div>
        </div>
    </div>
  )
}

export default Card