import * as React from 'react';
import { HashRouter, useNavigate, Link, Route, Routes } from "react-router-dom";
// we need to import navigate so that we can navigate between paths ONLY INSIDE ROUTER PAGES
// const navigate = useNavigate();

import AlertProvider from "./contexts/AlertContext";
import './assets/style.css';

// import pages for React Router
import WelcomePage from './components/WelcomePage';
import NavBar from './components/NavBar';
import Alerts from './components/Alerts';
import Visualization from './components/Visualization';
// import YamlPage from './components/YamlPage';

// Created frontend routes with Welcome Page default. Navbar consists of links to routes.
const App = () => {

  return(
    <AlertProvider>
      <HashRouter basename="/">
        <main id="page">
          <div id="welcome-page">
            <Link to="/">
            {/* <h1 id="company">Khartes</h1> */}
            {/* <img src="./assets/Map.png"></img> */}
            </Link>
            <NavBar />
          </div>
          <Routes>
            <Route path="/" element= {
              <WelcomePage />
            }
            />
            <Route path="/alerts" element= {
              <Alerts />
            }
            />
            <Route path="/visualization" element= {
            <Visualization />
            }
            />
            {/* <Route path="/yaml" element = {
              <YamlPage />
            }
            /> */}
          </Routes>
        {/* Link to Home */}
        </main>
      </HashRouter>
    </AlertProvider>
  )
}

export default App;