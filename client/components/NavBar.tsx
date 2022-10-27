import * as React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

// this component will hace conditional logic if different pages need to render different Navs
// home button, back button?
    return(
      <nav className="nav"> 
        <div className="page"><Link to='/home'><u>Home</u></Link></div>
        <div className="page"><Link to='/alerts'><u>Alerts</u></Link></div>
        <div className="page"><Link to='/yaml'><u>Yaml</u></Link></div>
      </nav>
    )
  }
  
  export default NavBar;