import React, { useState,useEffect,useRef } from 'react'
import Card from '../Card/Card.jsx'
import {Link} from 'react-router-dom'
import "./CardPage.css"
import Pagination from '../Pagination/Pagination.jsx'
import Search from '../Search/Search.jsx'

const CardPage = () => {

    const API_URL = 'http://localhost:8000/api/movies';

    const [movies, setMovies] = useState([{}]);
    const [loading,setLoading] = useState(true);
    const [movieData,setMovieData] = useState([]);
    const [error,setError] = useState(null);
    const [page,setPage] = useState(0);
    useEffect(() => {
      
        const fetchRecords = async () => {
          try {
            const response = await fetch(`${API_URL}?page=${page}`);
            const data = await response.json();
            setMovies(data);
            setLoading(false);
            setMovieData(data);
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
    
        fetchRecords();
      }, [page])

      

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
  return (
    <div className="card_page">
       <Search movies={movies} setMovies= {setMovies} movieData={movieData}/>
        <nav>
            <h1>Movies</h1>
            <button type="button" className="btn btn-primary">
                <Link to="/card/add">Create</Link>
            </button>

        </nav>

        <div className="cards">

            {movies.map((movie,index)=>{
                return <Card movie = {movie} key={index} setMovies={setMovies} index={index} movies={movies}/>
            })}
        </div>
        <Pagination page={page} setPage={setPage}/>
    </div>
  )
}

export default CardPage