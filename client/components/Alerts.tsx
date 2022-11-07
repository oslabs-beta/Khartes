import React, { useState, useEffect } from 'react';
import { json } from 'stream/consumers';
import { AlertsInterface } from '../Types';
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

  //functionality to add Alerts
  // function addAlerts (newAlertObj: AlertsInterface) {
  //   // updates state with pushing new alert object
  //   setAlerts(oldState => {
  //     // if newAlertObj is an array of more alert objects, push them into the old state
  //     if (Array.isArray(newAlertObj)) return [...oldState, ...newAlertObj];
  //     // otherwise if it's just one alert, push it.
  //     return [...oldState, newAlertObj]
  //   })
  // }

  //functionality to update Alerts
  function updateAlerts (id: number, status: string) {
   //need to add functionality for how to pass in specific status changes
   // delete button
   
    // grabbing the id of the alert and new Status, we can change the status
    setAlerts(oldState => {
      // creating a copy of old state
      let newState = [...oldState];
      // mapping the new state and if the id matches, change the status
      newState = newState.map((alertObj: AlertsInterface) => {
        if (alertObj.id === id){
          alertObj.status = status;
        }
        return alertObj;
      })
      // returning the new state
      return newState;
    })

      fetch('http://localhost:8000/alerts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, status: status})
      })
        .then(res => {
          console.log("made it back from PATCH");
          res.json();
        })
        // .then(() => {
        //   // do we want to put our setAlerts logic only after it's deleted from backend?
        // })
        .catch((err) => {
          console.log('There was an error in updateAlerts fetch request.');
          console.log(err);
        })
  }

    //functionality to delete Alerts
  function deleteAlerts (id: number) {
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
  for (let i = 0; i < alerts.length; i++) {
    alertsObjs.push(<ProblemObject key={alerts[i].id} alertObj={alerts[i]} />);
  }

    return(
      <div className="contents">
        {alertsObjs}
        
      </div>
    )
  }
  
  export default Alerts;