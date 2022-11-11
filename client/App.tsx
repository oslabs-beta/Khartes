import * as React from 'react';
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import AlertProvider from "./contexts/AlertContext";
import './assets/style.css';
import WelcomePage from './components/WelcomePage';
import NavBar from './components/NavBar';
import Alerts from './components/Alerts';
import Visualization from './components/Visualization';

// Created frontend routes with Welcome Page default. Navbar consists of links to routes.
const App = () => {

  return(
    <AlertProvider>
      <HashRouter basename="/">
        <main id="page">
          <div id="welcome-page">
            <Link to="/">
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
          </Routes>
        </main>
      </HashRouter>
    </AlertProvider>
  )
}

export default App;