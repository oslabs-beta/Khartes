// import React, { createContext, useContext, useState} from 'react';

// // types
// interface AlertsContextInterface {
//   id: number,
//   issue: string,
//   status: string,
//   node: string,
//   pod: string,
//   container: string,
//   //check if metrics is an object
//   metrics: string,
//   oldYaml: string,
//   newYaml: string
// }

// type AlertsContextType = {
//   alerts: AlertsContextInterface[];
//   addAlerts: (newAlertObj: AlertsContextInterface) => void;
//   updateAlerts: (id: number, status: string) => void;
//   deleteAlerts: (id: number) => void;
// }

// export const AlertsContext = React.createContext<AlertsContextType | null> (null);
// // const AlertsUpdateContext = React.createContext<AlertsContextInterface | null> (null)

// export function useDataContext () {
//   return useContext(AlertsContext);
// }

// // export function useDataUpdateContext () {
// //   return useContext(AlertsUpdateContext);
// // }

// const defaultAlerts = [
// {
//   id: 1,
//   issue: 'Low Disk Storage',
//   status: 'Pending',
//   node: 'name',
//   pod: 'name',
//   container: 'name',
//   metrics: {limits: 'X variable', data: 'Y variable'},
//   oldYaml: 'blah blah',
//   newYaml: 'blah blah blah'
// },
// {
//   id: 2,
//   issue: 'OOM Kill Warning',
//   status: 'Pending',
//   node: 'name',
//   pod: 'name',
//   container: 'name',
//   metrics: {limits: 'X variable', data: 'Y variable'},
//   oldYaml: 'blah blah',
//   newYaml: 'blah blah blah'
// }
// ]

// const AlertProvider: React.FC<React.ReactNode> = ({children}) => {
//   const [alerts, setAlerts] = React.useState<AlertsContextInterface[]>(defaultAlerts); //default data will change to an empty array 

//   //functionality to add Alerts
//   function addAlerts (newAlertObj: AlertsContextInterface) {
//     // updates state with pushing new alert object
//     setAlerts(oldState => {
//       // if newAlertObj is an array of more alert objects, push them into the old state
//       if (Array.isArray(newAlertObj)) return [...oldState, ...newAlertObj];
//       // otherwise if it's just one alert, push it.
//       return [...oldState, newAlertObj]
//     })
//   }

//   //functionality to update Alerts
//   function updateAlerts (id: number, status: string) {
//     // grabbing the id of the alert and new Status, we can change the status
//     setAlerts(oldState => {
//       // creating a copy of old state
//       let newState = [...oldState];
//       // mapping the new state and if the id matches, change the status
//       newState = newState.map((alertObj: AlertsContextInterface) => {
//         if (alertObj.id === id){
//           alertObj.status = status;
//         }
//         return alertObj;
//       })
//       // returning the new state
//       return newState;
//     })
//   }

//     //functionality to delete Alerts
//   function deleteAlerts (id: number) {

//     setAlerts(oldState => {
//       // logic to remove the object with this ID from our old state
//       let newState = [...oldState];
//       newState = newState.filter(alertObj => {
//         if (alertObj.id === id) return false;
//         return true;
//       })
//       return newState;
//     })
//   }

//   return (
//     <AlertsContext.Provider value= {{alerts, addAlerts, updateAlerts, deleteAlerts}}>
//         {children}
//     </AlertsContext.Provider>
//   )
// }

// export default AlertProvider;