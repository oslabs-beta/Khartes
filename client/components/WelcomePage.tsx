import * as React from 'react';
import { HashRouter, useNavigate, Link, Route, Routes } from "react-router-dom";
// import img from 'client/assets/logo.jpeg'
// import YamlView from './YamlView';

const WelcomePage = () => {
// we need to import navigate so that we can navigate between paths 
// ONLY INSIDE ROUTER PAGES
  const navigate = useNavigate();


  return (
    <div>
      Welcome to Khartes! Make sure your Kubectl is connected to your K8s cluster.
    
      When you have addressed an issue, but the cluster has not been updated change status to Pending
      When the issues has been resolved and the cluster has been updates delete the alert.
      <div> BETA: Map of the cluster</div>
      {/* <img alt="" src="{img}"" /> */}
      {/* <img alt="" src="../assets/logo.jpeg" /> */}
    </div>
  )
}




export default WelcomePage;