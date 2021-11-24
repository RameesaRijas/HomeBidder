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
import usePropertyData from './hooks/usePropertyData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const {state, addToYourFav, removeFromFav} = usePropertyData();

  return (
        <BrowserRouter>
          <div className="App">
          <NavBar />
          <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={1700}/>
          <Switch>
            <Route exact path="/">
              <PropertyList list={state} addToYourFav={addToYourFav} removeFromFav={removeFromFav}/>
            </Route>
            <Route path="/listing/:propertyId" >
              <Property />
            </Route>
            <Route exact path="/login" >
              <Login />
            </Route>
            <Route exact path="/register" >
              <Register />
            </Route>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
