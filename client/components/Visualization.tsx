import * as React from 'react';
import { useLocation, Link } from "react-router-dom"
// import YamlView from './YamlView';
import { useEffect } from "react";
import { useRef } from 'react';
import { AlertsInterface } from '../Types';
import Graph from './Graph'

// declare namespace JSX{
//   interface ElementAttributesProperty {
//     props:
//   }
// } 

const Visualization = () => {
  // logic for passing down props using location. Location needs a state object
  const location = useLocation();
  const alertObj = location.state;
  let display3: string = "display3";
  console.log("Visualization page");
  console.log(alertObj);
  // Obtaining the text input value from the input field
  const textInput = React.useRef<HTMLInputElement | null>(null);
 

    const fixOptions = () => {
      // Obtain the input percentage
      const fixedPercent = textInput.current?.value;
    
      // send Patch to backend with id and % for fix
      // fetch('http://localhost:8000/fix', { // this route is not discussed with the backend yet
      //     method:'PATCH',
      //     headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({id: alertObj.id, fixedPercent: fixedPercent})
      // })
      //   .then(res => { // response will be the entire alertObj
      //     console.log("made it back from PATCH");
      //     let response = res.json()
      //     // console.log('response', response);
      //     display3 = "display3";
      //     // let display3 = response.newYaml;
      //   })
      //   .catch((err) => {
      //     console.log('There was an error in updateAlerts fetch request.');
      //     console.log(err);
      //   })

      
      // toggle fixWasApplied to true
      // fixWasApplied = true;
      setFixWasApplied(true);
    }
    
    // onclick -> patch request -> res = newstring; 
    // change the variable that is relevant after the response is received
    // string     
    //Hopefullly the following code will updte fixWasApplied if the oldYaml is changed
    // this should drill down to YamlView and cause a re-render
    // const [oldYaml, setYaml] = React.useState<string>;
    const [fixWasApplied, setFixWasApplied] = React.useState<boolean>(false);
    console.log(fixWasApplied);
    
    // useEffect(() => {
    //   console.log(fixWasApplied);
    // }, [fixWasApplied])

  
// useEffect(() => {
//     // do i need further conditionals here to prevent problems of multiple re-renders?
//     fixWasApplied = true;
// }, [location.state])

// const ready = setTimeout(() => {fixWasApplied = true}, 5000);

const display = alertObj.oldYaml;
const display2 = alertObj.newYaml;  




//| undefined            //[[number, string],[number, string]]     //can also create a numberOrString type and use that. 
    // this component will display graphs, issue descript and two buttons auto-fix or fix options
    // buttons may need to be updated with new content based on our shifting MVP
        return(
          <div className='visualization-grid'>
           <div className="left-grid">
              <div className='graphcontents'> 
                <Graph alert={alertObj}/>
              </div>
              <div className='alertcontents'>
                <h3> Alert Information </h3>
                <h3> Container: {alertObj.container} </h3>
                <h3> Node: {alertObj.node} </h3>
                <h3> Pod: {alertObj.pod} </h3>
                <h3> Issue: {alertObj.issue}</h3>
                <h3> Status: {alertObj.status}</h3>
                <p> Current Limit: {alertObj.limit}</p>
              </div>
              <div className='fixcontents'>
                <h3> Fix Options </h3>
                <h3> Raise you limit by: </h3>
                <input id="input" type="text" ref={textInput} defaultValue='20'></input>
                <div><h2>%</h2></div>
                <button className="button" onClick={fixOptions}> Create Fixed Yaml </button>
              </div>
           </div>
           <div className="right-grid">
              <div> 
           {fixWasApplied === false &&
        <div className="yamlcontents">
              <div> Current configuration details from your pod: </div>
            <pre> {display} </pre>
            </div>}
            {fixWasApplied === false &&
        <div className="yamlcontents">
              <div> Update configurations based on your choice. </div>
              <div> Please copy the text below into the 'container' section of the yaml file for your pod:</div>
              <div> To find the yaml file for your pod, run 'kubectl somecommand blah blah'</div>
              <div> Open that file, paste in our provided details, then run 'kubectl blah blah blah to deploy your new configuration to the cluster</div>
              <div> Or follow the workflow most appropriate to your organization, happy configuring!</div>
            <pre> {display3} </pre>
            </div>}
            { fixWasApplied === false &&
              <div className="yamlcontents">
            <div> Suggested configuration to avoid errors. Accept the current suggestion, or enter a new % in the box to the left. </div>
            <div> Once you've made your selection, hit the FIX button to receive your new configuration.</div>
            <pre> {display2} </pre>
            </div>}

           </div>

           </div>
         
           
          
           <Link to="/alerts">Back to Alerts</Link>
          </div>
        )
      }
      
      export default Visualization;
