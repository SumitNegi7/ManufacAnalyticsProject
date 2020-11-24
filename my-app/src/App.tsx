import React from 'react';
import './App.css';
import Navigation from "../src/Components/navigation.component";
import Signup from "../src/Components/signup.component";
import Login from "../src/Components/login.component";
import Profile from "../src/Components/profile.component";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// Routing all the components 

const  App:React.FC = () =>{
  const theme = createMuiTheme({
    palette: {
      primary:{
        main: '#00796b'
      },
      secondary: {
        main: '#E33E7F'
      }
    }
  });

 
  return (
  <Router>
    <MuiThemeProvider theme={theme}>
      
  <div>
  <Navigation/>
  {/* Navigation always loads as it is outside the switch */}
  <Switch>
   <Route path="/signup" exact><Signup/> </Route>
   <Route path="/signin" exact><Login/> </Route>
   <Route path="/profile" exact><Profile/> </Route>
   <Route path="/" exact><Login/> </Route>
    
</Switch>

  </div>
  </MuiThemeProvider>
  </Router>
  );
}

export default App;
