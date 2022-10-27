// import React, { createContext, useContext, useState} from 'react';

// interface DataContextInterface {
//   name: string;
//   author: string;
//   url: string;
// }

// const DataContext = createContext<DataContextInterface | null> (null);
// const DataUpdateContext = createContext<DataContextInterface | null> (null)

// export function useDataContext () {
//   return useContext(DataContext);
// }

// export function useDataUpdateContext () {
//   return useContext(DataUpdateContext);
// }

// const defaultData = {
//   alert: 'Low Disk Storage',
//   suggestion: 'Replace Disk',
//   yaml: 'Suggested in YAML file'
// }

// export function DataProvider({children}){
//   const [data, setData] = useState(defaultData); //default data will change to an empty array 

//   function addData(newDataObj) {
//     // does some functionality to setData how we like
//     // setData(oldState => {
//       // the following below is if we want to delete something
//       // if (newDataObj.hasOwnProperty('DELETEID')) {
//       //   // logic to remove the object with this ID from our old state
//       //   let newState = [...oldState];
//       //   newState = newState.filter(element => {
//       //     if (element._id === newDataObj.DELETEID)
//       //   })
//       // }
//     // })
//   }

//   return (
//     <DataContext.Provider value= {data}>
//       <DataUpdateContext.Provider value={addData}>
//         {children}
//       </DataUpdateContext.Provider>
//     </DataContext.Provider>
//   )
// }