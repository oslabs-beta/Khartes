import React, { useEffect } from 'react';
import ProblemObject from './problemobject';
import { useDataContext} from '../contexts/AlertContext'

// This component renders our alerts in the alerts page.
const Alerts = () => {
  // Fetching alerts and fetchAlerts from our Context.
  const { alerts, fetchAlerts } = useDataContext();
  
  // Upon load, we want to invoke fetch alerts and create an interval to re-fetch every 15 seconds.
  useEffect(() => {
    
    fetchAlerts();
    const handleInterval = (): void => {
      fetchAlerts();
    }

    const intervalId = setInterval(handleInterval, 60000);
    return () => clearInterval(intervalId); 
  }, []); 

  const alertsObjs = [];
  for (let i = alerts.length-1; i >= 0 ; i--) {
    if (alerts[i].status === 'Pending'){
      alertsObjs.push(<ProblemObject 
        className='Pending' 
        key={alerts[i].id} 
        alertObj={alerts[i]} 
        index={i}
        />);
    } else {
      alertsObjs.push(<ProblemObject 
          className='New' 
          key={alerts[i].id} 
          alertObj={alerts[i]} 
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