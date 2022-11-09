import React, { useState, useEffect } from 'react';
import { json } from 'stream/consumers';
import { AlertsInterface } from '../../Types';
import ProblemObject from './problemobject';
// import YamlView from './YamlView';

// const [deletedAlerts, setDeletedAlerts] = React.useState<AlertsInterface[]>([]);

/* this component will be our home page and possibly a template for other pages
 styling needs: a basic size and set of elements
Sub components:
navbar
list (this is a box, also maybe modular for re-use that will host individual problem objects)
    list can also contain the filer button?
*/

const Alerts = () => {
 //default data will change to an empty array 

const [alerts, setAlerts] = React.useState<AlertsInterface[]>([]); 
const [visual, setVisual] = React.useState<boolean[]>([]); 

  // functionality to add Alerts
  function updateVisual (index: number, boolean: boolean) {
    // updates state with pushing new alert object
    setVisual(oldState => {
      const newState = [...oldState];
      newState[index] = boolean;
      return newState;
    })
  }

  //functionality to update Alerts, we are receiving an updated alert from visualization page
  async function updateAlerts (updatedAlertObj: AlertsInterface) {
    alert('reached updateAlerts')
    alert(updatedAlertObj)
    console.log(updatedAlertObj);

    // grabbing the id of the alert and new Status, we can change the status
    setAlerts(oldState => {
      // creating a copy of old state
      let newState = [...oldState];
      // mapping the new state and if the id matches, change the status
      newState = newState.map((alertObj: AlertsInterface) => {
        if (alertObj.id === updatedAlertObj.id){
          alertObj = updatedAlertObj
        }
        return alertObj;
      })
      // returning the new state
      return newState;
    })
    console.log(updatedAlertObj)

    // console.log(updatedAlertObj);
      
  }

    //functionality to delete Alerts
  function deleteAlerts (id: number) {
    alert('made it to deletealerts func');
  setAlerts(oldState => {
    // logic to remove the object with this ID from our old state
    let newState = [...oldState];
    newState = newState.filter(alertObj => {
      if (alertObj.id === id) {
        // before the alert is deleted in the frontend, add to deletedAlerts Array
          // setDeletedAlerts(oldState => {
          //   return [...oldState, alertObj]
          // });
        return false;
    }
      return true;
    })
    return newState;
    })
  
  }
  
  
  useEffect(() => {
    
    const fetchAlerts = ():void => { // fetchinterval pings the server every 30 seconds, until the component unmounts
      fetch('http://localhost:8000/alerts')
        .then(response => response.json()) // refine this, but basically update state with alert list the fetch returns
        .then(data => {
          if (data !== alerts) {
            console.log('received updated alerts');
            setAlerts(data);
            if(visual.length === 0) {
              setVisual(Array(data.length).fill(false));
            }
          }
        })
        .catch() // error handler
    };
    fetchAlerts();
    const intervalId = setInterval(fetchAlerts, 15000);
    return () => clearInterval(intervalId); // the return statement will clear the interval when the component unmounts... does the component unmount when we navigate away?
  }, []); // the array has to do with things that will update during the component lifecycle. Use effect will only run on component mount since we pass empty array as second arg
  



  
  /* i think here we will have conditional logic that renders one <ProblemObject /> for each element in alertsList
  and we will prop drill details of the individual alert into each problemobject
  for */
  const alertsObjs = [];
  for (let i = alerts.length-1; i >= 0 ; i--) {
    if (alerts[i].status === 'Pending'){
      alertsObjs.push(<ProblemObject 
        className='Resolved' 
        key={alerts[i].id} 
        alertObj={alerts[i]} 
        visual={visual[i]} 
        updateVisual={updateVisual}  
        updateAlerts={updateAlerts} 
        deleteAlerts={deleteAlerts} 
        index={i}/>);
    } else {
      alertsObjs.push(<ProblemObject 
          className='New' 
          key={alerts[i].id} 
          alertObj={alerts[i]} 
          visual={visual[i]} 
          updateVisual={updateVisual} 
          updateAlerts={updateAlerts} 
          deleteAlerts={deleteAlerts} 
          index={i}/>);
    }
  }

    return(
      <div className="contents">
        {alertsObjs}
        
      </div>
    )
  }
  
  export default Alerts;