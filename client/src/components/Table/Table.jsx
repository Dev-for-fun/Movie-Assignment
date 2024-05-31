import {useState,useEffect,useCallback} from 'react';
import Pagination from '../Pagination/Pagination';

const API_URL = 'http://localhost:8000/api/movies';



export default function DataTable() {
  const [rows,setRows] = useState({});
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [page, setPage] = useState(0)
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`${API_URL}?page=${page}`);
        const data = await response.json();
        setRows(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [page])
  

  const handleDeleteRow = async(index,row)=>{
    //logic that send the enter rows to the server and server deletes the selected rows
    try{

      await fetch(`${API_URL}/${row.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setRows(rows.filter((_, i) => i !== index));
    }
    catch(err){
      setError(err)
    }
  }

  const handleAddRow = async () => {
    const newRecord = {id:'',title:'', genres: '', year: '', Rating: '', RottenTomato: '' };
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
        regex = /^-?(\d+(\.\d*)?|\.\d+)$/
        ;
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
      newRecords[index][field] = value;
      setRows(newRecords);
    }
    else{
      setError("Please enter a valid value")
    }
  }

  const handleUpdateRow = async(index,key,rowId)=>{
    //here update function will be called to the server
    const data = {
      [key]:rows[index][key]
    }
    try {
      await fetch(`${API_URL}/${rowId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
        },
       
        body: JSON.stringify(data),
      })
    } catch (error) {
      setError(error);
    }
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
                        onBlur={()=>handleUpdateRow(index,key,row.id)}
                        style={{border:"none"}}
                      />
                    </td>
                  )
                ))}
                <td>
                  <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteRow(index,row)}>Delete</button>

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
      <Pagination page={page} setPage={setPage}/>
    </div>
    
  );
}
