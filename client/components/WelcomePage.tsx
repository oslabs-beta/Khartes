import * as React from 'react';
import { HashRouter, useNavigate, Link, Route, Routes } from "react-router-dom";

const WelcomePage = () => {
// we need to import navigate so that we can navigate between paths 
// ONLY INSIDE ROUTER PAGES
  const navigate = useNavigate();

  // WE DO NOT NEED BELOW FUNCTION ANYMORE, ADDED NAV BAR 
  // function to move to Home page on button click
  // const handleButton = (event: any, button: any) => {
  //   if (button == "home"){
  //     navigate('/home');
  //   } else if (button == "alerts"){
  //     navigate('/alerts');
  //   } else {
  //     navigate('/yaml');
  //   }
  // }

  return (
    <div>
      Welcome to Khartes! Make sure your Kubectl is connected to your K8s cluster.
    
      When you have addressed an issue, but the cluster has not been updated change status to Pending
      When the issues has been resolved and the cluster has been updates delete the alert.
      {/* how to pass a parameter into a handle click, want to pass in name of button */}
      {/* <button onClick={event => handleButton(event, "home")}>Home</button>
      <button onClick={event => handleButton(event, "alerts")}>Alerts</button>
      <button onClick={event => handleButton(event, "yaml")}>Yaml</button> */}
    </div>
  )
}




export default WelcomePage;