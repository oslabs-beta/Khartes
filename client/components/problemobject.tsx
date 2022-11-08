import * as React from 'react';
import { AlertsInterface } from '../Types';
import { useNavigate } from 'react-router-dom';

type problemObjectProps = {
  alertObj: AlertsInterface
  className: String
  updateAlerts: (updatedAlertObj: AlertsInterface) => void
};

const ProblemObject = (props: problemObjectProps):JSX.Element => {

  const navigate = useNavigate();
  /** {
  id: number,
  issue: string,
  status: string,
  node: string,
  pod: string,
  container: string,
  //check if metrics is an object
  metrics: string,
  oldYaml: string,
  newYaml: string
} */
  let status = 'new-buttons';
  if (props.className === 'Resolved'){
    status === 'resolved-buttons'
  }

// this component will receive data about particualr pods/pvs etc and be rendered repeatedly in the list on the home page
    return(
      <div>
        <div className="problemobject">
          <div id="left">
          Pod: {props.alertObj.pod} has {props.alertObj.issue}
          </div>
          <div id="right">
          {/* Aut-fix View Details */}
           {/* Here we will display and access some information about the pods
           display: pod and the issue
           color coordination based on status
            */}
              <button className={status}> Status: Pending </button>
              <button className={status}> Status: Resolved </button>
            <button className="home-buttons"> Auto-fix </button>
            <button className="home-buttons" onClick={() => {
              navigate('/visualization', { state: props });
            }}> See Details </button>
          </div>
        </div>
      </div>    
    ) 
  }
  
  export default ProblemObject;