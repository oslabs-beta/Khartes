import * as React from 'react';
import { useLocation, Link } from "react-router-dom"
import YamlView from './YamlView';
const { useEffect } = require("react");
import { useRef } from 'react';

const Visualization = () => {
  // logic for passing down props using location. Location needs a state object
  const location = useLocation();
  const alertObj = location.state;
  // Obtaining the text input value from the input field
  let textInput = React.useRef<HTMLInputElement | null>(null);

    const fixOptions = () => {
      // Obtain the input percentage
      let fixedPercent = textInput.current?.value;
    
      // send Patch to backend with id and % for fix
      fetch('http://localhost:8000/fix', { // this route is not discussed with the backend yet
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: alertObj.id, fixedPercent: fixedPercent})
      })
        .then(res => { // response will be the entire alertObj
          console.log("made it back from PATCH");
          let response = res.json()
          display - response.newYaml;
        })
        .catch((err) => {
          console.log('There was an error in updateAlerts fetch request.');
          console.log(err);
        })
      // toggle fixWasApplied to true
      fixWasApplied = true;
    }

    // onclick -> patch request -> res = newstring; 
    // change the variable that is relevant after the response is received
    // string     
    //Hopefullly the following code will updte fixWasApplied if the oldYaml is changed
    // this should drill down to YamlView and cause a re-render
    // const [oldYaml, setYaml] = React.useState<string>;
    // const [fixWasApplied, setFixWasApplied] = React.useState: string('false');
  let fixWasApplied = false;

// useEffect(() => {
//     // do i need further conditionals here to prevent problems of multiple re-renders?
//     fixWasApplied = true;
// }, [location.state])

// const ready = setTimeout(() => {fixWasApplied = true}, 5000);

const display = alertObj.oldYaml;
const display2 = alertObj.newYaml;  

    // this component will display graphs, issue descript and two buttons auto-fix or fix options
    // buttons may need to be updated with new content based on our shifting MVP
        return(
          <div>
            {/* <NavBar />
           <Chart /> */}
           
           <h3> Visualization Page </h3>
           <p> LEFT SIDE: Alert Details</p>
           <p>RIGHT SIDE Chart</p>
           <p>{alertObj.issue}</p>
           <button className="button"> Description of Alerts </button>
           <input id="input" type="text" ref={textInput} defaultValue='20'></input>
           <div><h2>%</h2></div>
           <button className="button" onClick={fixOptions}> Fix by Button </button>
           <div>Your configuration details:</div>
           <div className="yamlcontents"> 
           {/* <YamlView alertObj={alertObj} fixWasApplied={fixWasApplied}/>  */}
           {fixWasApplied === false &&
        <div>
              <div> ORIGINAL YAML, this is conditionally rendered if fixWasApplied = false </div>
            <pre> {display} </pre>
            </div>}

          // this relies on the alertObject having been updated! so we need to be sure to fetch the new alertObject
          // from the backend after sending them the user input
            {fixWasApplied === true &&
        <div>
              <div> CORRECTED YAML, this is conditionally rendered if fixWasApplied = true </div>
            <pre> {display3} </pre>
            </div>}

            { fixWasApplied === false &&
              <div>
            <div> SUGGESTED FIX </div>
            <pre> {display2} </pre>
            </div>}

           </div>
           <Link to="/alerts">Back to Alerts</Link>
          </div>
        )
      }
      
      export default Visualization;
