import React, {useState, useEffect, useContext} from 'react';
import './Css/BottomNav.css';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory, useLocation } from 'react-router';
import { CurrentUser } from '../App';

const BottomNav = () => {
  const [active, setActive] = useState();
  const history = useHistory();
  const location =useLocation();

  const user = useContext(CurrentUser);

  useEffect(()=>{
    if(location.pathname === '/feeds'){setActive('home')}
    if(location.pathname === '/admin'){setActive('profile')}
    if(location.pathname === '/about'){setActive('people')}
  }, [location.pathname])

  const clickHandle = (e)=>{
    if(e.target.id==='home'){
      history.push('/feeds');
      setActive('home')
    }
    if(e.target.id==='profile'){
      history.push(`/${user.username}`);
      setActive('profile')
    }
  }
  

  return (
    <div className='bnav'>
      <div onClick={clickHandle} id='home' className={(active==='home')? `navicon active`: `navicon`} value='home'>
        
        <HomeIcon />
        Home
        
      </div>

      <div onClick={clickHandle} id='trending' className={(active==='trending')? `navicon active`: `navicon`} name='trending'>
        <WhatshotIcon />
        Trending
      </div>

      <div onClick={clickHandle} id='people' className={(active==='people')? `navicon active`: `navicon`} name='people'>
        <PeopleOutlineIcon />
        People
      </div>
      {user.id?
      <div onClick={clickHandle} id='profile' className={(active==='profile')? `navicon active`: `navicon`} name='account'>
        <AccountCircleIcon />
        Profile
      </div>:<></>}

    </div>
  )
}

export default BottomNav
