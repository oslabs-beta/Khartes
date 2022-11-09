import * as React from 'react';
import { useLocation, Link } from "react-router-dom"
// import YamlView from './YamlView';
import { useEffect } from "react";
import { useRef } from 'react';
import { AlertsInterface } from '../../Types';
import Graph from './Graph'
import { useDataContext } from '../contexts/AlertContext'
import { AlertObjInterface } from '../contexts/AlertContext';

// declare namespace JSX{
//   interface ElementAttributesProperty {
//     props:
//   }
// } 

interface VisualizationObjectProps {
  // alertObj: AlertsInterface
  id: number
  // className: string
  // updateAlerts: (updatedAlertObj: AlertsInterface) => void
  // deleteAlerts: (params:number) => void
}

const Visualization = (props:VisualizationObjectProps) => {
  
  const {alerts, updateAlerts } = useDataContext();
  const id = (props.id -1);
  // console.log(alerts);
  // console.log(updateAlerts);
  // console.log(id);
  // console.log(props.id);
  // console.log(props);
  // logic for passing down props using location. Location needs a state object
  // const location = useLocation();
  // console.log(location.state);
  // const alertObj = location.state.alertObj;
  // const index = alertObj.id;
  // const updatedAlertObj = alerts[index];
  // const updateAlerts = location.state.updateAlerts;

  let display3 = "display3";
  // console.log("Visualization page");
  // console.log(alertObj);
  // Obtaining the text input value from the input field
  const textInput = React.useRef<HTMLInputElement | null>(null);
  const commentInput = React.useRef<HTMLInputElement | null>(null);

    const fixOptions = () => {
      // Obtain the input percentage
      const fixedPercent = textInput.current?.value;
    
      // send Patch to backend with id and % for fix
      fetch('/alerts/1', { // this route is not discussed with the backend yet
          method:'PUT',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: alerts[id], fixedPercent: fixedPercent})
      })
        .then(res => { // response will be the entire alertObj
          console.log("made it back from PATCH");
          res.json()
          // console.log('response', response);
          display3 = "display3";
          // let display3 = response.newYaml;
        })
        .catch((err) => {
          console.log('There was an error in updateAlerts fetch request.');
          console.log(err);
        })

      
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

// actual code used below

    const [fixWasApplied, setFixWasApplied] = React.useState<boolean>(false);
    console.log(fixWasApplied);

    const [content, setContent] = React.useState<number[]>([])
    
    useEffect(() => {
      console.log(id);
      // console.log(alerts[id]);
      // console.log(alerts[id].oldYaml);
      console.log("contents")
      console.log(content);
      if (id && !content){
        const newArray = [];
        newArray.push(id);
        setContent(newArray); 
        console.log(content)
      }

      // const display = alerts[content[0]].oldYaml;
      // const display2 = alerts[content[0]].newYaml;
    })
    // const display = alerts[content[0]].oldYaml;
    // const display2 = alerts[content[0]].newYaml;

    // const display = alerts[content].oldYaml;
    // const display2 = alerts[content].newYaml;  




    // useEffect(() => {
    //   console.log(fixWasApplied);
    // }, [fixWasApplied])

  
// useEffect(() => {
//     // do i need further conditionals here to prevent problems of multiple re-renders?
//     fixWasApplied = true;
// }, [location.state])

// const ready = setTimeout(() => {fixWasApplied = true}, 5000);




// const [commentsArray, setCommentsArray] = React.useState<any>(alertObj.comments); // actual code, hard code below
// const [commentsArray, setCommentsArray] = React.useState<any>(['a comment', 'a second comment', "third"]);
// let commentsArrayLis: any[] = [];


async function addComments() {
  console.log("in add comments func")
  console.log(alerts[id]);
  console.log(updateAlerts);
  const newAlertObj = Object.assign({}, alerts[id]);
  const newComment = commentInput.current?.value;
  const oldCommentsArr = newAlertObj.comments;
  oldCommentsArr.push(newComment);

  const updatedComments = [...oldCommentsArr];
  // newCommentsArray.push(newComment);
  newAlertObj.comments = updatedComments;

  //pass new alert object to general update function
  console.log(newAlertObj)
  console.log(typeof newAlertObj);
  // updateAlerts(newAlertObj);
  // console.log(newAlertObj.id)
  // const {id} = newAlertObj;
  // fetch('http://localhost:8000/alerts')
  // const response = await
    fetch(`http://localhost:8000/alerts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAlertObj)
      })
        .then(()=> {
          console.log("made it back")
          // updateAlerts(newAlertObj);
        })
        .catch((err) => {
          console.log('There was an error in updateAlerts fetch request.');
          console.log(err);
        }
        )
  // version assuming we are grabbing data from updated alert object
  // commentsArrayLis = newAlertObj.comments.map((el: any) => {el = <li>${el}</li>})
}




//| undefined            //[[number, string],[number, string]]     //can also create a numberOrString type and use that. 
    // this component will display graphs, issue descript and two buttons auto-fix or fix options
    // buttons may need to be updated with new content based on our shifting MVP
        return(
          <div className='visualization-grid'>
           <div className="left-grid">
              <div className='graphcontents'> 
                <Graph alert={alerts[id]}/>
              </div>
              <div className='alertcontents'>
                <h3> Alert Information </h3>
                <p> Container: {alerts[id].container} </p>
                <p> Node: {alerts[id].node} </p>
                <p> Pod: {alerts[id].pod} </p>
                <p> Issue: {alerts[id].issue}</p>
                <div>
                <p> Status: {alerts[id].status}</p>
                <button className="button" onClick={addComments}> Toggle Status </button>
                </div>
              </div>
              <div className='fixcontents'>
                <h3> Fix Options </h3>
                <h3> Raise you limit by: </h3>
                <input id="input" type="text" ref={textInput} defaultValue='20'></input>
                <h3> Your Comments on this Alert: </h3>
                <ul>
                  {alerts[id].comments}
                </ul>
                <h3> Add comments below: </h3>
                <input id="input" type="text" ref={commentInput} defaultValue="Write notes here"></input>
                <button className="button" onClick={() => addComments()}> Add your notes </button>
                <button className="button" onClick={fixOptions}> Create Fixed Yaml </button>
              </div>
           </div>
           <div className="right-grid">
              <div> 
           {fixWasApplied === false &&
        <div className="yamlcontents">
              <div> Current configuration details from your pod: </div>
            {/* <pre> {display} </pre> */}
            </div>}
            {fixWasApplied === false &&
        <div className="yamlcontents">
              <div> Update configurations based on your choice. </div>
              <div> Please copy the text below into the 'container' section of the yaml file for your pod:</div>
              <div> To find the yaml file for your pod, run 'kubectl somecommand blah blah'</div>
              <div> Open that file, paste in our provided details, then run 'kubectl blah blah blah to deploy your new configuration to the cluster</div>
              <div> Or follow the workflow most appropriate to your organization, happy configuring!</div>
            {/* <pre> {display3} </pre> */}
            </div>}
            { fixWasApplied === false &&
              <div className="yamlcontents">
            <div> Suggested configuration to avoid errors. Accept the current suggestion, or enter a new % in the box to the left. </div>
            <div> Once you've made your selection, hit the FIX button to receive your new configuration.</div>
            {/* <pre> {display2} </pre> */}
            </div>}

           </div>

           </div>
         
           
          
           <Link to="/alerts">Back to Alerts</Link>
          </div>
        )
      }
      
      export default Visualization;
