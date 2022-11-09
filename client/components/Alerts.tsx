import React, { useState, useEffect } from 'react';
import { json } from 'stream/consumers';
import { AlertsInterface } from '../../Types';
import ProblemObject from './problemobject';

import { useDataContext, AlertObjInterface, AlertsContextType } from '../contexts/AlertContext'

const Alerts = () => {
  const { alerts, fetchAlerts } = useDataContext();
  

// const [visual, setVisual] = React.useState<boolean[]>([]); 

//   // functionality to add Alerts
//   function updateVisual (index: number, boolean: boolean) {
//     // updates state with pushing new alert object
//     setVisual(oldState => {
//       const newState = [...oldState];
//       newState[index] = boolean;
//       return newState;
//     })
//   }
  
  
  useEffect(() => {
    
    fetchAlerts();
    const handleInterval = (): void => {
      fetchAlerts();
    }

    const intervalId = setInterval(handleInterval, 15000);
    return () => clearInterval(intervalId); // the return statement will clear the interval when the component unmounts... does the component unmount when we navigate away?
  }, []); // the array has to do with things that will update during the component lifecycle. Use effect will only run on component mount since we pass empty array as second arg
  
  
  /* i think here we will have conditional logic that renders one <ProblemObject /> for each element in alertsList
  and we will prop drill details of the individual alert into each problemobject
  for */
  const alertsObjs = [];
  for (let i = alerts.length-1; i >= 0 ; i--) {
    if (alerts[i].status === 'Pending'){
      alertsObjs.push(<ProblemObject 
        className='Pending' 
        key={alerts[i].id} 
        alertObj={alerts[i]} 
        // index={i} 
        // visual={visual[i]} 
        // updateVisual={updateVisual}  
        // updateAlerts={updateAlerts} 
        // deleteAlerts={deleteAlerts} 
        index={i}
        />);
    } else {
      alertsObjs.push(<ProblemObject 
          className='New' 
          key={alerts[i].id} 
          alertObj={alerts[i]} 
          // visual={visual[i]} 
          // updateVisual={updateVisual} 
          // updateAlerts={updateAlerts} 
          // deleteAlerts={deleteAlerts} 
          index={i}
          />);
    }
  }

    return(
      <div className="contents">
        {alertsObjs}
      </div>
    )
  }
  
  export default Alerts;