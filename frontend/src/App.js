import './App.css';
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">


        <NavBar />


        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>



      </div>
    </BrowserRouter>
  );
}

export default App;
