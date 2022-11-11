import * as React from 'react';
import { AlertsInterface } from '../../Types/Types';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../contexts/AlertContext'

// interface for types in the props object passed down
interface problemObjectProps {
  alertObj: AlertsInterface
  index: number
  className: string
}

// Component for each Individual Alert/Problem.
const ProblemObject = (props: problemObjectProps) => {
  // Importing and utilizing useNavigate to navigate between pages.
  const navigate = useNavigate();

  // Fetching deleteAlerts and addAlertObj functions from context to use on this component.
  const { deleteAlerts, addAlertObj } = useDataContext();
  // Fetching alert object passed from props object.
  const alerts = props.alertObj;
  
  // Function to handle deleting alerts on button click.
  const handleDelete = ():void => {
    deleteAlerts(alerts.id)
  }

  // Function to handle routing to visualization page.
  const handleRoute = () =>{
    // Save the alert object into state empty array state and pass it into a function to save the alert object into state.
    const newAlert = props.alertObj;
    addAlertObj(newAlert)

    // Navigate to visualization page.
    navigate('/visualization');
  }   

// This component will receive data about a particualr pods/pvs and can be rendered repeatedly in the list on the alerts page.
  return(
      <div className='problemdiv'>
        <div className="problemobject">
          <div id="left">
            <button className={props.className}> Status: {props.className} </button>
            <div>
              Pod: {props.alertObj.pod}
            </div>
            <div>
              Issue: {props.alertObj.issue}
            </div>
          </div>
          <div id="right">
            <button className="home-buttons" onClick={handleDelete}> Delete Alert </button>
            <button className="home-buttons" onClick={handleRoute}> See Details </button>
          </div>
        </div>
      </div>    
    ) 
}
  
  export default ProblemObject;