import * as React from 'react';
import Graph from './Graph'
import { useDataContext } from '../contexts/AlertContext'

// Visualization component will contain all information from specific alert object.
const Visualization = () => {
  
  // Fetching data and functions from context to use in component.
  const {clickedAlerts, addAlertObjComment, updateStatus, createYaml } = useDataContext();

  // Obtaining the text input value from the input field.
  const textInput = React.useRef<HTMLInputElement | null>(null);
  const commentInput = React.useRef<HTMLInputElement | null>(null);

  // Function to create YAML on button click.
  const fixOptions = () => {
      // Obtain the input percentage
      const fixedPercent = textInput.current?.value;
      // If fixed percent is defined, create YAML
      if (fixedPercent){
        createYaml(alertObj, fixedPercent);
      }
      // Upon button click, render the suggested files.
      setFixWasApplied(true);
  }

  // Using state to render suggested files on click.
  const [fixWasApplied, setFixWasApplied] = React.useState<boolean>(false);
  
  // Assign the alert object to be the newly clicked alert saved in the state array.
  const alertObj = clickedAlerts[0];

  // Function to update the status
  function changeStatus () {
    updateStatus(alertObj);
  }

  // Function to update comments
  function addComments() {
    const newComment = commentInput.current?.value;

    if (newComment){
      addAlertObjComment(alertObj, newComment)
    }
  }

  // Creating a list of comments to render.
  const totalComments = [];
  for (let i = 0; i < alertObj.comments.length; i++){
    totalComments.push(<li>{alertObj.comments[i]}</li>);
  }

  return(
    <div className='visualization-grid'>
      <div className="left-grid">
        <Graph alert={alertObj}/>
        <div className='alertcontents'>
          <div className="title">
            <h3> Alert Information </h3>
            <button className="status-button" onClick={changeStatus}> Change Status </button>
          </div>
          <p> Container: {alertObj.container} </p>
          <p> Node: {alertObj.node} </p>
          <p> Pod: {alertObj.pod} </p>
          <p> Issue: {alertObj.issue}</p>
          <p> Status: {alertObj.status}</p>
          <p> Comments: </p>
          <ul> 
            {totalComments}
          </ul>
          <input id="input" type="text" ref={commentInput} placeholder="Write notes here"></input>
          <button className="button" onClick={addComments}> Add your notes </button>
          <div className='fixOptions'>
            <h3> Fix Options </h3>
            <p> Raise your limit by %: </p>
            <input id="input" type="text" ref={textInput} defaultValue='20'></input> 
            <button className="button" onClick={fixOptions}> Create Fixed Yaml </button>
          </div>
        </div>
      </div>
      <div className="right-grid">
        <div className="yamlcurrent">
          <div> Current configuration details from your pod: </div>
        </div>
        <div className="yaml1">
          <pre> {alertObj.oldYaml} </pre>
        </div>
        {fixWasApplied === true &&
        <div className='yamlsuggested-container'>
          <div className="yamlsuggested">
            <div> Update configurations based on your choice. </div>
            <div> Step 1: Please copy the text below into the 'container' section of the yaml file for your pod.</div>
            <div> Step 2: Find the yaml file for your pod.</div>
            <div> Step 3: Open that file, paste in our provided details, then run 'kubectl apply -f (insert your yamlname).yml' to deploy your new configuration to the cluster.</div>
            <div> Or follow the workflow most appropriate to your organization, happy configuring!</div>
          </div>
          <div className="yamlcontents">
            <pre> {alertObj.newYaml} </pre>
          </div>
        </div>}
      </div> 
    </div>
  )
}
      
export default Visualization;
