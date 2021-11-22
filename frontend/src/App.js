import './App.css';

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostListingForm from './components/Property/PostListingForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">


        <NavBar />


        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="properties/new" element={<PostListingForm />} />
        </Routes>



      </div>
    </BrowserRouter>
  );
}

export default App;
