import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './components/Login';
import RegistForm from './components/Register'

import { BrowserRouter,Routes, Route, Link } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
  
      <h1>Welcome</h1>
      <header>
        <nav>
          <ul>
            
           
         
          <Link to="/login">login</Link>
          
          
          <Link to="/Register">Register</Link>
          
       
          </ul>
        </nav>
      </header>
      

    <Routes>
      <Route path="/Login"element={<Login/>}>
      </Route>
      <Route path="/Register"element={<RegistForm/>}>
      </Route>
      <Route path="/login" component={Login} />
    </Routes>
    
    </div>
    </BrowserRouter>
  

  );
}

export default App;
