import * as React from 'react';
import { HashRouter, useNavigate, Link, Route, Routes } from "react-router-dom";

const WelcomePage = () => {
// we need to import navigate so that we can navigate between paths 
// ONLY INSIDE ROUTER PAGES
  const navigate = useNavigate();

  return (
    <div>
      Welcome Page Renders!
    </div>
  )
}




export default WelcomePage;