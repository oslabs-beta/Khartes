import React, { createContext, useContext, useState} from 'react';
import { length } from '../../webpack.config';

// Types interface for Alert Object.
export interface AlertObjInterface {
  id: number
  issue: string
  status: string
  node: string
  pod: string
  container: string
  metric: number
  limit: number
  historicalMetrics: number[][]
  oldYaml: string
  newYaml: string
  comments: string[]
}
// Types interface for the Context
export type AlertsContextType = {
  clickedAlerts: AlertObjInterface[]
  alerts: AlertObjInterface[];
  fetchAlerts: () => void;
  deleteAlerts: (id: number) => void;
  addAlertObj: (alertObj: AlertObjInterface) => void;
  addAlertObjComment: (alertObj: AlertObjInterface, newComment: string) => void;
  updateStatus: (alertObj: AlertObjInterface) => void;
  createYaml: (alertObj: AlertObjInterface, fixedPercent: string) => void;
}
// Creating a data context to share to components with default being an empty object literal.
export const DataContext = React.createContext<AlertsContextType>({} as AlertsContextType);

// Exporting useDataContext so we can apply this function in other components.
export function useDataContext () {
  return useContext(DataContext);
}

// Props for our children parameter
type Props = {
  children?: React.ReactNode;
};

export const AlertProvider: React.FC<Props> = ({children}) => {
  // Creating alerts, clicked alerts, and functionality to change those states (both states initialized as an empty array).
  const [alerts, setAlerts] = React.useState<AlertObjInterface[]>([]);
  const [clickedAlerts, addAlert] = React.useState<AlertObjInterface[]>([]);

  // Functionality to fetch all alerts
  const fetchAlerts = ():void => {
     // Fetch interval pings the server every 15 seconds, until the component unmounts.
    fetch('http://localhost:8000/alerts')
      .then(response => response.json())
      .then(data => {
        if (data !== alerts) {
          setAlerts(data);
        }
      })
      .catch()
  };

  // Function to delete a specific alert depending on the ID
  function deleteAlerts (id: number) {
  setAlerts(oldState => {
    // Logic to remove the object with this ID from our old state
    let newState = [...oldState];
    newState = newState.filter(alertObj => {
      if (alertObj.id === id) {
        return false;
    }
      return true;
    })
    return newState;
    })
  }

  // Function to add a specific alert object on click.
  function addAlertObj (alertObj: AlertObjInterface){
    const newAlertArr = [alertObj];
    addAlert(newAlertArr);
  }

  // Function to update the status.
  function updateStatus (alertObj: AlertObjInterface){

    if (alertObj.status === 'Pending'){
      alertObj.status = 'New';
    } else {
      alertObj.status = 'Pending';
    }
    
    addAlert(oldState => {
      let newState = [...oldState];
      newState = newState.map(alert => {
        if (alert.id === alertObj.id){
          alert.status = alertObj.status;
        }
        return alert;
      })
      return newState;
      });

      // Update the database.
      fetch(`http://localhost:8000/alerts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(alertObj)
      })
        .catch((err) => {
          console.log('There was an error in updateAlerts fetch request.');
          console.log(err);
        });
  }

  // Function to update alert object's comments.
  function addAlertObjComment (alertObj: AlertObjInterface, newComment: string){
    const allComments = [...alertObj.comments, newComment];
    alertObj.comments = allComments;
    // Function to update state.
    addAlert(oldState => {
      let newState = [...oldState];
      newState = newState.map(alert => {
        if (alert.id === alertObj.id){
          alert.comments = allComments;
        }
        return alert;
      })
      return newState;
    });

    // Update the database.
    fetch(`http://localhost:8000/alerts`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(alertObj)
    })
      .catch((err) => {
        console.log('There was an error in updateAlerts fetch request.');
        console.log(err);
      })
  }

  // Function to create yaml based on input.
  function createYaml (alertObj: AlertObjInterface, fixedPercent: string){
    // Send Patch to backend with % for fix
    fetch(`http://localhost:8000/fix/${fixedPercent}`, {
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(alertObj)
    })
    .then(res => res.json())
    .then(res => {
      alertObj.newYaml = res.newYaml;
      addAlert(oldState => {
        let newState = [...oldState];
        newState = newState.map(alert => {
          if (alert.id === alertObj.id){
            alert.newYaml = alertObj.newYaml;
          }
          return alert;
        })
        return newState;
      });
    })
    .catch((err) => {
      console.log('There was an error in updateAlerts fetch request.');
      console.log(err);
    })
  }

  return (
    <DataContext.Provider value= {{clickedAlerts, alerts, fetchAlerts, deleteAlerts, addAlertObj, updateStatus, addAlertObjComment, createYaml}}>
        {children}
    </DataContext.Provider>
  )
}

export default AlertProvider;