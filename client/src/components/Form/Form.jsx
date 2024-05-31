import React,{useState,useEffect} from 'react'
import { Formik } from "formik";
import * as yup from "yup";
import "./Form.css"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Form = () => {
    const API_URL = 'http://localhost:8000/api/movies';
    const { id } = useParams();
    const [error,setError] = useState(null);
    const [editPage, setEditPage] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
      if (id) {
        setEditPage(true);
      } else {
        setEditPage(false);
      }
    }, [id]);
    
    const movieSchema = yup.object().shape({
        title: yup.string().required("required"),
        genres: yup.string().required("required"),
        year: yup.number().required("required"),
        Rating: yup.number().required("required"),
        RottenTomato: yup.number().required("required"),
      });

      const initialMovieValue = {
        title:"",
        genres:"",
        year:"",
        Rating:"",
        RottenTomato:""
      };

      const handleAddMovie = async(values,onSubmitProps)=>{
        try{

          await fetch(`${API_URL}/add`, {
          method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          onSubmitProps.resetForm();
          navigate("/card");
        }
        catch(error){
          setError(error);
        }
      }

      const handleEditMovie = async(values,onSubmitProps)=>{
        try {
          await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          onSubmitProps.resetForm();
          navigate("/card");
          
        } catch (error) {
          setError(error);
        }
      }

      const handleFormSubmit = async (values, onSubmitProps) => {
          if(editPage){
            await handleEditMovie(values,onSubmitProps);
          }
          else{
            await handleAddMovie(values,onSubmitProps);
          }
        
      };
    
      if (error) {
        return <div>Error: {error}</div>;
      }
  return (
    <Formik
    onSubmit={handleFormSubmit}
    initialValues={initialMovieValue}
    validationSchema={movieSchema}
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
          <label htmlFor="title" className="form-label">Name of the Movie</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
          />
          {errors.title && touched.title && <div className="text-danger">{errors.title}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="genres" className="form-label">Genres</label>
          <input
            type="text"
            className="form-control"
            name="genres"
            placeholder="Comedy|Action"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.genres}
          />
          {errors.genres && touched.genres && <div className="text-danger">{errors.genres}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year</label>
          <input
            type="number"
            className="form-control"
            name="year"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.year}
          />
          {errors.year && touched.year && <div className="text-danger">{errors.year}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="Rating" className="form-label">Rating</label>
          <input
            type="number"
            className="form-control"
            name="Rating"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Rating}
          />
          {errors.Rating && touched.Rating && <div className="text-danger">{errors.Rating}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="RottenTomato" className="form-label">Rotten Tomato Rating</label>
          <input
            type="number"
            className="form-control"
            name="RottenTomato"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.RottenTomato}
          />
          {errors.RottenTomato && touched.RottenTomato && <div className="text-danger">{errors.RottenTomato}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )}
  </Formik>
    
  )
}

export default Form