import React from 'react'
import {Formik} from "formik";
import * as yup from "yup";
import "./Form.css"
const Form = () => {
    const movieSchema = yup.object().shape({
        title: yup.string().required("required"),
        genres: yup.string().required("required"),
        year: yup.number().required("required"),
        Ratings: yup.number().required("required"),
        RottenTomato: yup.number().required("required"),
      });

      const initialMovieValue = {
        title:"",
        genres:"",
        year:null,
        Ratings:null,
        RottenTomato:null
      };

      const handleFormSubmit = async (values, onSubmitProps) => {
        console.log(values);
        console.log(onSubmitProps);
      };

  return (
    <Formik  onSubmit={handleFormSubmit}
    initialValues={initialMovieValue}
    validationSchema={movieSchema}>
        {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} className='app__form'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Name of the Movie</label>
                <input type="text" className="form-control" name='title' onBlur={handleBlur} onChange={handleChange} value={values.title||""}/>
            </div>
            <div className="mb-3">
                <label htmlFor="genres" className="form-label">Genres</label>
                <input type="text" className="form-control" name='genres' placeholder='Comedy|Action' onBlur={handleBlur} onChange={handleChange} value={values.genres||""}/>
            </div>
            <div className="mb-3">
                <label htmlFor="year" className="form-label">Year</label>
                <input type="number" className="form-control" name='year' onBlur={handleBlur} onChange={handleChange} value={values.year||0}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Ratings" className="form-label">Ratings</label>
                <input type="number" className="form-control" name='Ratings'onBlur={handleBlur} onChange={handleChange} value={values.Ratings||0}/>
            </div>
            <div className="mb-3">
                <label htmlFor="RottenTomato" className="form-label">Rotten Tomato Ratings</label>
                <input type="number" className="form-control" name='RottenTomato' onBlur={handleBlur} onChange={handleChange} value={values.RottenTomato||0}/>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )}
    </Formik>
    
    // <div className="app__form">
        // <form onSubmit={e =>handleSubmitFunction(e)}>
        //     <div className="mb-3">
        //         <label htmlFor="title" className="form-label">Name of the Movie</label>
        //         <input type="text" className="form-control" name='title'/>
        //     </div>
        //     <div className="mb-3">
        //         <label htmlFor="genres" className="form-label">Genres</label>
        //         <input type="text" className="form-control" name='genres' placeholder='Comedy|Action'/>
        //     </div>
        //     <div className="mb-3">
        //         <label htmlFor="year" className="form-label">Year</label>
        //         <input type="number" className="form-control" name='year'/>
        //     </div>
        //     <div className="mb-3">
        //         <label htmlFor="Ratings" className="form-label">Ratings</label>
        //         <input type="number" className="form-control" name='Ratings'/>
        //     </div>
        //     <div className="mb-3">
        //         <label htmlFor="RottenTomato" className="form-label">Rotten Tomato Ratings</label>
        //         <input type="number" className="form-control" name='RottenTomato'/>
        //     </div>
            
        //     <button type="submit" className="btn btn-primary">Submit</button>
        // </form>
    // </div>
  )
}

export default Form