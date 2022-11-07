import getPods from "./Controllers/getPods";
import getPrometheusData from "./Controllers/getPrometheusData";
import {createAlert} from "./Controllers/createAlert";
import checkForOomkill from "./Controllers/checkForOomkill";
import { startPortForward } from "./Controllers/startPortForward";
import { dbController } from "./Controllers/dbController";

//Standardize our alerts
//list of issues
const oomkillIssue = "Potential OomKill detected"
const diskFullIssue = "Potential Disk Full issue detected"
const nodeBurstIssue = "Potential Node Burst issue detected"

/*
Pull data every X(15) seconds, calls the correct controllers.
    
    
check the data
    if problem detected, create baby alert and check it against already created alerts in the db. 
        dbController.exists
    create Alert object if problem detected.
           
*/

const startHeartbeat = () => {
//Start port-forwarding
  startPortForward();
  console.log("we're in the heartbeat function babump")


//call getPods to get the list of pods and their associated nodes in an object.
  const podsList = getPods();


// getPrometheusData(pod, node)
//iterate through this list and plug the associated pod and node into getPrometheusData (send a complete promQL query) Specifically for DiskFull
//we will receive back the data point from prometheus
//send this data point to checkForDiskFull. If it returns true. We need to build an alert with createAlert.



//iterate through this list and plug the associated pod and node into getPrometheusData (send a complete promQL query) Specifically for NodeBurst
//we will receive back the data point from prometheus
//send this data point to checkForNodeBurst. If it returns true. We need to build an alert with createAlert.


//check request vs limit for overallocated resources if we want to do Over allocated resources?


//iterate through this list and plug the associated pod and node into getPrometheusData (send a complete promQL query) Specifically for OomKill
//we will receive back the data point from prometheus
//send this data point to checkForOomkill. If it returns true. We need to build an alert with createAlert.
  for(let i = 0; i < podsList.length; i++){
      //OOMKILL
      const memUsageQuery = 'container_memory_usage_bytes';
      const memUsage:any = getPrometheusData(podsList[i].pod, 'container_memory_usage_bytes');
      const memLimit:any = getPrometheusData(podsList[i].pod, 'container_spec_memory_limit_bytes');
      //const oomkill = checkForOomkill(memUsage, memLimit);
      const oomkill = true;

      if(oomkill && !dbController.checkIfAlertAlreadyExists({pod: podsList[i].pod, issue: oomkillIssue})){
          //create an alert
          createAlert(podsList[i].node, podsList[i].pod, oomkillIssue, memUsage, memLimit, memUsageQuery);
      }
  }
}
startHeartbeat();




