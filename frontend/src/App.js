import './App.css';

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import PostListingForm from './components/Property/PostListingForm';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
            <Route exact path="/">
            </Route>
            <Route exact path="/login" >
              <Login />
            </Route>
            <Route exact path="/register" >
              <Register />
            </Route>
            <Route exact path="/properties/new" >
              <PostListingForm />
            </Route>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
