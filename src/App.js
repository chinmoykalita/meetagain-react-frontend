import React, {useState, useEffect, createContext} from 'react';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Feeds from './Components/Feeds';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Header from './Components/Header';
import BottomNav from './Components/BottomNav';
import Stories from './Components/Stories';
import { getToken } from './Components/Auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProfilePage from './Components/ProfilePage';
import axios from 'axios';

// using context api to pass the current user to the other children componants to avoid prop drilling
const CurrentUser = createContext({})

function App() {

  const [cuser, setCuser] = useState({});

  // getting the current logged in user and storing it in the state
  const getCurrentUser = async ()=>{
    // parsing the auth token from cookies
    const token = getToken();
    if(token){
    const res = await axios('http://localhost:8000/api/auth/current_user/',{
      method: 'POST',
      headers: {
          "Content-type": "application/json", "Accept": "application/json",
          "Authorization": `Token ${token}`}});
    setCuser(res.data); 
    }     
  }

  useEffect(()=>{
    getCurrentUser()    
  }, [])

  
  
      
  

  return (
    <Router>
    <CurrentUser.Provider value = {cuser}>

    <Header title='MeetAgain' />

  
  {/* routings */}
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path='/feeds'>
        <Feeds />
      </Route>

      <Route path="/signup">
        {(!cuser.id)?
        <SignUp />
        :<Redirect to='/feeds' />
        }        
      </Route>

      <Route path="/signin">
        {(!cuser.id)?
        <SignIn />:
        <Redirect to='/feeds' />
        }
      </Route>

      <Route path="/profile/:id">
        <ProfilePage />
      </Route>

      {/* testing route   */}
      <Route exact path="/test">
        <Stories />
      </Route>

    </Switch>

    <div className='bottom'>
      <BottomNav />
    </div>        
  
    
  </CurrentUser.Provider>
    </Router>
  );
}

export { CurrentUser };
export default App;
