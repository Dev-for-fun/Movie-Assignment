import React from 'react'
import "./Pagination.css"
const Pagination = ({page,setPage}) => {

    const handleNextPage = ()=>{
        setPage(page+1)
    }

    const handlePrevPage = ()=>{
        setPage(page-1);
    }
    
  return (
    <div className="pagination">
        <button className="btn btn-primary" type="submit" disabled={page===0} onClick={handlePrevPage}>Prev</button>
        <button className="btn btn-primary" type="submit" onClick={handleNextPage}>Next</button>

    </div>
  )
}

export default Pagination