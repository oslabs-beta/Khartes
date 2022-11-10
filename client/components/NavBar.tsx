import * as React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return(
      <nav className="nav"> 
        <div className="welcome"><Link className="welcome" to='/'>Welcome</Link></div>
        <div className="alerts"><Link className="alerts" to='/alerts'>Alerts</Link></div>
      </nav>
    )
  }
  
  export default NavBar;