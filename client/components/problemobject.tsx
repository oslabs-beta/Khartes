import * as React from 'react';
import { AlertsInterface } from '../../Types';
import { useNavigate } from 'react-router-dom';
import { constants } from 'fs/promises';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Visualization from './Visualization';
import { useDataContext } from '../contexts/AlertContext'

// replaced type to interface, it is better ideal to receive for funcs/objs
interface problemObjectProps {
  alertObj: AlertsInterface
  // visual: boolean
  // updateVisual: (index: number, boolean: boolean) => void
  index: number
  className: string
  // updateAlerts: (updatedAlertObj: AlertsInterface) => void
  // deleteAlerts: (params:number) => void
}

const ProblemObject = (props: problemObjectProps) => {
  const navigate = useNavigate();
  const { deleteAlerts, addAlertObj } = useDataContext();

  const alerts = props.alertObj;

  const handleDelete = ():void => {
    deleteAlerts(alerts.id)
  }

// console.log(props);

// const addComments = () => {
//   console.log("in add comments func")
//   console.log(props.alertObj);
//   // console.log(updateAlerts);
//   const newAlertObj = props.alertObj;
//   // const newComment = commentInput.current?.value;
//   // const oldCommentsArr = newAlertObj.comments;
//   // oldCommentsArr.push(newComment);

//   // const updatedComments = [...oldCommentsArr];
//   // newCommentsArray.push(newComment);
//   // newAlertObj.comments = updatedComments;

//   //pass new alert object to general update function
//   console.log(newAlertObj)
//   console.log(typeof newAlertObj);
//   // console.log(newAlertObj.id)
//   // const {id} = newAlertObj;
//   // fetch('http://localhost:8000/alerts')
// fetch("http://localhost:8000/alerts/1", {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newAlertObj)
//       })
//         .then(()=> {
//           console.log("made it back")
//           // updateAlerts(newAlertObj);
//         })
//         .catch((err) => {
//           console.log('There was an error in updateAlerts fetch request.');
//           console.log(err);
//         }
//         )
//       }

    const handleRoute = () => {
        // save the alert object into state empty array state
        const newAlert = props.alertObj;
        addAlertObj(newAlert)
        // navigate to new page
        navigate('/visualization', { state: props.alertObj });
    }
      

// this component will receive data about particualr pods/pvs etc and be rendered repeatedly in the list on the home page
// switch (visual) {
//   case true: 
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
            <div></div>
            {/* <button className="home-buttons" onClick={addComments}> run add comments </button> */}
            <button className="home-buttons" onClick={handleDelete}> Delete Alert </button>
              {/* <button className={props.className}> Status: Resolved </button> */}
              {/* <div className="alerts"><Link to='/visualization'><u>See Details</u></Link></div> */}
            <button className="home-buttons" onClick={handleRoute}> See Details </button>
            {/* <button className="home-buttons" onClick={() => {updateVisual(index, false)}}></button> */}
          </div>
          {/* <Visualization id={props.alertObj.id}/> */}
        </div>
      </div>    
    ) 
}
  
  export default ProblemObject;