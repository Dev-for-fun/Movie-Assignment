import {useState,useEffect,useCallback} from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const API_URL = 'http://localhost:8000/api/movies';



const a = [
  { id: 1, title: 'Snow', genres: 'Jon', year: 35,Rating:1,RottenTomato:29 },
  { id: 2, title: 'Snow', genres: 'Jon', year: 35,Rating:1,RottenTomato:29 }
];
export default function DataTable() {
  const [rows,setRows] = useState(a);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // const response = await fetch(API_URL);
        // const data = await response.json();
        // setRows(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [])
  

  const handleDeleteRow = (index)=>{
    //logic that send the enter rows to the server and server deletes the selected rows
    setRows(rows.filter((_, i) => i !== index));
  }

  const handleAddRow = async () => {
    const newRecord = { id:'' ,title:'', genres: '', year: '', Rating: '', RottenTomato: '' };
    try {
      setRows([...rows, newRecord]);
    } catch (error) {
      setError(error.message);
    }
  };

  const validateValue = (field, value) => {
    let regex;

    if (field === 'year' || field === 'Rating' || field === 'RottenTomato') {
        // Numeric validation using regex (only allows numbers)
        regex = /^\d+$/;
    } else {
        // String validation using regex (only allows non-empty strings)
        regex = /^[^\s]+$/;
    }

    return regex.test(value);
  }

  const handleInputChange = (index, field, value) => {
    const newRecords = [...rows];
    
    const isValidValue = validateValue(field,value);

    if(isValidValue){
      //have to call the update function if it error due to validation we show the error
      newRecords[index][field] = value;
      setRows(newRecords);
    }
    else{
      setError("Please enter a valid value")
    }
  }

  const handleUpdateRow = async(rowId)=>{
    //here update function will be called to the server
  }
 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Movies</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Year</th>
            <th scope="col">Rating</th>
            <th scope="col">RottenTomato</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row,index) => (
              <tr key={row.id}>
                {Object.keys(row).map((key) => (
                  key !== 'id' && (
                    <td key={key}>
                      <input
                        type="text"
                        value={row[key]}
                        onChange={(e) => handleInputChange(index,key,e.target.value)}
                        onBlur={()=>handleUpdateRow(row.id)}
                        style={{border:"none"}}
                      />
                    </td>
                  )
                ))}
                <td>
                  <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteRow(index)}>Delete</button>

                </td>
              </tr>
            ))}
              <tr>
                <td colSpan="6">
                  <button type="button" className="btn btn-outline-primary" onClick={handleAddRow}>Add Row</button>
                </td>
              </tr>
        </tbody>
      </table>
    </div>
    
  );
}
