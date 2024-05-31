import React from 'react'
import Card from '../Card/Card.jsx'
import {Link} from 'react-router-dom'
import "./CardPage.css"
const CardPage = () => {

    const movies = [
        { id: 1, title: 'Snow', genres: 'Jon', year: 35,Rating:1,RottenTomato:29 },
        { id: 2, title: 'Snow', genres: 'Jon', year: 35,Rating:1,RottenTomato:29 },
        { id: 2, title: 'Snow', genres: 'Jon', year: 35,Rating:1,RottenTomato:29 },
        { id: 2, title: 'Snow', genres: 'Jon', year: 35,Rating:1,RottenTomato:29 },
        { id: 2, title: 'Snow', genres: 'Jon', year: 35,Rating:1,RottenTomato:29 },
        { id: 2, title: 'Snow', genres: 'Jon', year: 35,Rating:1,RottenTomato:29 }
    ];

  return (
    <div className="card_page">
        <nav>
            <h1>Movies</h1>
            <button type="button" className="btn btn-primary">
                <Link to="/card/add">Create</Link>
            </button>

        </nav>

        <div className="cards">

            {movies.map((movie,index)=>{
                return <Card movie = {movie} key={index}/>
            })}
        </div>

    </div>
  )
}

export default CardPage