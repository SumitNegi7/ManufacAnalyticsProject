import React from 'react';
import './App.css';
import Navigation from "../src/Components/navigation.component";
import Signup from "../src/Components/signup.component";
import Login from "../src/Components/login.component";
import Profile from "../src/Components/profile.component";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

const authentication={
  isLoggedIn:false
}

const  App:React.FC = () =>{


 
  return (
  <Router>
  <div>
  <Navigation/>
  <Switch>
   <Route path="/signup" exact><Signup/> </Route>
   <Route path="/signin" exact><Login/> </Route>
   <Route path="/profile" exact><Profile/> </Route>
   <Route path="/" exact><Login/> </Route>
    
</Switch>

  </div>
  </Router>
  );
}

export default App;
