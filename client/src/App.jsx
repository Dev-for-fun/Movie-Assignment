
import CardPage from "./components/CardPage/CardPage.jsx"
import Form from "./components/Form/Form.jsx";
import EnhancedTable from "./components/Table/Table.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<EnhancedTable />} />
          <Route path="/card" element={<CardPage/>}/>
          <Route path="/card/add" element={<Form/>}/>
          <Route path="/card/:id"element={<Form/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
