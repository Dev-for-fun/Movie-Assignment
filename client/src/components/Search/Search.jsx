import "./Search.css"
import { Formik } from "formik"
import React from 'react'
import * as yup from "yup";

const Search = ({movies,setMovies}) => {
     const API_URL = 'http://localhost:8000/api/movies'
    const searchSchema = yup.object().shape({
        searchTerm: yup.string().required("required"),
    });

    const initialSearchValue = {
        searchTerm:""
    };

    const handleFormSubmit = async(values,onSubmitProps)=>{
        const fetchRecords = async () => {
          try {
            const response = await fetch(`${API_URL}/all`);
            const data = await response.json();
            setMovies(data);
          } catch (error) {
            console.log(error);
          }
        };
      await fetchRecords();
        const query = values.searchTerm;
        console.log(query);
        console.log(movies);
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.genres.toLowerCase().includes(query.toLowerCase()) ||
            movie.year.toString().includes(query)
          );
          // Update the displayed records with the filtered results
          setMovies(filteredMovies);
    }

  return (
    <Formik
    onSubmit={handleFormSubmit}
    initialValues={initialSearchValue}
    validationSchema={searchSchema}
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
    }) => (
      <form onSubmit={handleSubmit} className='app__form'>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="searchTerm"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.RottenTomato}
            placeholder="search here... "
          />
          {errors.RottenTomato && touched.RottenTomato && <div className="text-danger">{errors.RottenTomato}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )}
  </Formik>
  )
}

export default Search