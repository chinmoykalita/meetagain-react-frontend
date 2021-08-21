import React, { useContext } from 'react';
import './Css/Header.css';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { logOut } from './Auth';
import { CurrentUser } from '../App';
import SearchIcon from '@material-ui/icons/Search';

const Header = (props) => {
  const user = useContext(CurrentUser)
  

  // const getCurrentUser = ()=>{
  //   var token = getToken();
  //   fetch('http://localhost:8000/api/auth/current_user/',{
  //       method: 'POST',
  //       headers: {
  //           "Content-type": "application/json", "Accept": "application/json",
  //           "Authorization": `Token ${token}`}
        
  //       }).then(res=>res.json()).then((r)=>setUser(r))
  // }

  // useEffect(()=>{
  //   if(props.isAuth){
  //     const cuser =  getCurrentUser();
  //     console.log(cuser);


  //   }
  // }, [props.isAuth])


  return (
    <div className="header">
      <h3>{props.title}</h3>
      
      <div className="navigation">

        <Link className='link_style' to='/feeds'><h5>Home</h5></Link>
        <Link className='link_style' to='/'><h5>Trending</h5></Link>
        <Link className='link_style' to='/'><h5>People</h5></Link>
        {/* account dropdown */}
        {(user.id)?
        <div class="dropdown">
          <h5 className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
            <Avatar 
              src={user.profile[0].photo}
              className='current_user_avatar'
           />
              {`${user.first_name} ${user.last_name}`}
              </h5>
      
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><Link to={`/${user.username}`} className="dropdown-item">Profile</Link></li>
            <li><Link class="dropdown-item">Account Management</Link></li>
            <li><a onClick={logOut} class="dropdown-item" href="#">Logout</a></li>
          </ul>

        </div>: <Link className='link_style' to='/signin'><h5>Login</h5></Link>}

        
      </div>
      <div className="search">
        
        <input type="text" name="searchbar" id="searchbar" placeholder='search people and posts!'/>
        {/* search bar for mobile devices */}
        
        <SearchIcon className='sicon' data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"/>
        

      </div>
    </div>
  )
}

export default Header
