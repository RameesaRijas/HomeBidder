import './App.css';
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import PropertyList from './components/Property/PropertyList';
import Property from './components/Property/Property';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropertyProvider from './providers/PropertyProvider';


function App() {

  return (
    <PropertyProvider>
        <BrowserRouter>
          <div className="App">
          <NavBar/>
          <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={1700}/>
          <Switch>
            <Route exact path="/">
              <PropertyList />
            </Route>
            <Route exact path="/listing/:propertyId" >
              <Property />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register" >
              <Register />
            </Route>
          </Switch>
      </div>
    </BrowserRouter>
    </PropertyProvider>
  );
}

export default App;
