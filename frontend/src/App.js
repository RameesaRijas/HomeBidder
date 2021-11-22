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

function App() {

  const {state} = usePropertyData();

  return (
        <BrowserRouter>
          <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/">
              <PropertyList list={state}/>
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
