import * as React from 'react';
import { HashRouter, useNavigate, Link, Route, Routes } from "react-router-dom";
// import img from '../assets/logo.jpeg'
import img from '../assets/logo.jpg'
// import YamlView from './YamlView';

const WelcomePage = () => {
// we need to import navigate so that we can navigate between paths 
// ONLY INSIDE ROUTER PAGES
  const navigate = useNavigate();


  return (
    <div className="welcomeflex">
           <div className="logo"> 
        <img className="fit" alt="" src={img} />
      </div>
      <div className="welcometext"> 
      {/* <h2> Welcome!  </h2> */}
      <div> 
        Welcome to Khartes! Make sure your Kubectl is connected to your K8s cluster.
    
      When you have addressed an issue, but the cluster has not been updated, change status to Pending.
      When the issue has been resolved, and the cluster has been updated, delete the alert.

      For more information, check out the <a href="https://github.com/oslabs-beta/Khartes/blob/dev/README.md"> README. </a>
   </div>
       </div>
    </div>
  )
}




export default WelcomePage;