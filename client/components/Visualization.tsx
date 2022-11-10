import * as React from 'react';
import { useLocation, Link } from "react-router-dom"
// import YamlView from './YamlView';
import { useEffect } from "react";
import { useRef } from 'react';
import { AlertsInterface } from '../../Types';
import Graph from './Graph'
import { useDataContext } from '../contexts/AlertContext'
import { AlertObjInterface } from '../contexts/AlertContext';

const Visualization = () => {
  
  const {clickedAlerts, addAlertObjComment, updateStatus, createYaml } = useDataContext();

  let display3 = "display3";

  // Obtaining the text input value from the input field
  const textInput = React.useRef<HTMLInputElement | null>(null);
  const commentInput = React.useRef<HTMLInputElement | null>(null);

    const fixOptions = () => {
      // Obtain the input percentage
      const fixedPercent = textInput.current?.value;

      if (fixedPercent){
        createYaml(alertObj, fixedPercent);
      }
      // toggle fixWasApplied to true
      setFixWasApplied(true);
    }
    
    // onclick -> patch request -> res = newstring; 
    // change the variable that is relevant after the response is received
    // string     
    //Hopefullly the following code will updte fixWasApplied if the oldYaml is changed
    // this should drill down to YamlView and cause a re-render
    // const [oldYaml, setYaml] = React.useState<string>;

// actual code used below

    const [fixWasApplied, setFixWasApplied] = React.useState<boolean>(false);

    const alertObj = clickedAlerts[clickedAlerts.length-1]
    // const display = alerts[content[0]].oldYaml;
    // const display2 = alerts[content[0]].newYaml;

    // const display = alerts[content].oldYaml;
    // const display2 = alerts[content].newYaml;  

    // useEffect(() => {
    //   console.log(fixWasApplied);
    // }, [fixWasApplied])
  
function changeStatus () {
  updateStatus(alertObj);
}

function addComments() {
  const newComment = commentInput.current?.value;

  if (newComment){
    addAlertObjComment(alertObj, newComment)
  }
}

// comments for notes
const totalComments = [];
for (let i = 0; i < alertObj.comments.length; i++){
  totalComments.push(`<ul>${alertObj.comments[i]}</ul>`);
}

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
                <div className="title">
                  <h3> Alert Information </h3>
                  <button className="button" onClick={changeStatus}> Change Status </button>
                </div>
                <p> Container: {alertObj.container} </p>
                <p> Node: {alertObj.node} </p>
                <p> Pod: {alertObj.pod} </p>
                <p> Issue: {alertObj.issue}</p>
                <p> Status: {alertObj.status}</p>
                <p> Comments: </p>
                  {totalComments}
                <input id="input" type="text" ref={commentInput} defaultValue="Write notes here"></input>
                <button className="button" onClick={addComments}> Add your notes </button>
              {/* <div className='fixcontents'> */}
                <h3> Fix Options </h3>
                <h3> Raise you limit by: </h3>
                <input id="input" type="text" ref={textInput} defaultValue='20'></input> 
                <button className="button" onClick={fixOptions}> Create Fixed Yaml </button>
              {/* </div> */}
              </div>
           </div>
           <div className="right-grid">
              <div> 
            <div className="yamlcurrent">
              <div> Current configuration details from your pod: </div>
            </div>
            <div className="yamlcontents">
              <pre> {alertObj.oldYaml} </pre>
            </div>
            {fixWasApplied === true &&
            <div>
              <div className="yamlsuggested">
                <div> Update configurations based on your choice. </div>
                <div> Please copy the text below into the 'container' section of the yaml file for your pod:</div>
                <div> To find the yaml file for your pod, run 'kubectl somecommand blah blah'</div>
                <div> Open that file, paste in our provided details, then run 'kubectl blah blah blah to deploy your new configuration to the cluster</div>
                <div> Or follow the workflow most appropriate to your organization, happy configuring!</div>
              </div>
              <div className="yamlcontents">
                <pre> {alertObj.newYaml} </pre>
              </div>
            </div>}
            {/* { fixWasApplied === false &&
              <div className="yamlcontents">
            <div> Suggested configuration to avoid errors. Accept the current suggestion, or enter a new % in the box to the left. </div>
            <div> Once you've made your selection, hit the FIX button to receive your new configuration.</div> */}
            {/* <pre> {display2} </pre> */}

           </div>
           </div>
          
           <Link className="link" to="/alerts">Back to Alerts</Link>
          </div>
        )
      }
      
      export default Visualization;
