import * as React from 'react';
import { AlertsInterface } from '../../Types';
import { useNavigate } from 'react-router-dom';
import { constants } from 'fs/promises';
import { useEffect } from 'react';

// replaced type to interface, it is better ideal to receive for funcs/objs
interface problemObjectProps {
  alertObj: AlertsInterface
  className: string
  updateAlerts: (updatedAlertObj: AlertsInterface) => void
  deleteAlerts: (params:number) => void
}

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
// useEffect(() => {

// console.log(props.className);

// }, []);

const deleteAlert = ():void => {
  // test
  alert('in delete alert function')
  // create fetch request with route delete
  // sending id in the request body
  fetch(`http://localhost:8000/alerts/${props.alertObj.id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    // after fetching and deleting from backend, update state
    .then(() => {
      props.deleteAlerts(props.alertObj.id)
    })

    // for testing, once fetch is finished, delete line below
    props.deleteAlerts(props.alertObj.id)
}


// this component will receive data about particualr pods/pvs etc and be rendered repeatedly in the list on the home page
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
          {/* Aut-fix View Details */}
           {/* Here we will display and access some information about the pods
           display: pod and the issue
           color coordination based on status
            */}
            <button className="home-buttons" onClick={deleteAlert}> Delete Alert </button>
              {/* <button className={props.className}> Status: Resolved </button> */}
            <button className="home-buttons" onClick={() => {
              navigate('/visualization', { state: props });
            }}> See Details </button>
           
            
          </div>
        </div>
      </div>    
    ) 
  }
  
  export default ProblemObject;