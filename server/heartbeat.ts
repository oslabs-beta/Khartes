import getPods from "./Controllers/getPods";
import getPrometheusData from "./Controllers/getPrometheusData";
import {createAlert} from "./Controllers/createAlert";
import checkForOomkill from "./Controllers/checkForOomkill";
import { dbController } from "./Controllers/dbController";
//import { startPortForward } from "./Controllers/startPortForward";
//import { exists } from "fs";

//list of issues for Alert object
const oomkillIssue = "Potential OomKill detected"
const diskFullIssue = "Potential Disk Full issue detected"
const nodeBurstIssue = "Potential Node Burst issue detected"

/*

heartbeat.ts:
  Pulls data every minute from each pod or node depending on the issue we're checking for.
  Then calls the correct controllers to evaluate data and create an alert if needed & not already in db.
           
*/

const startHeartbeat = async() => {

  //Start port-forwarding
  //no longer doing auto portforwarding at this time. Will try to include in future updates.
  //await startPortForward();
  


  //call getPods to get the list of pods and their associated nodes in an object.
  const podsList = await getPods();


  //iterate through this list and plug the associated pod and node into getPrometheusData (send a complete promQL query) Specifically for DiskFull
  //we will receive back the data point from prometheus
  //send this data point to checkForDiskFull. If it returns true. We need to build an alert with createAlert.



  //iterate through this list and plug the associated pod and node into getPrometheusData (send a complete promQL query) Specifically for NodeBurst
  //we will receive back the data point from prometheus
  //send this data point to checkForNodeBurst. If it returns true. We need to build an alert with createAlert.



  //iterate through this list and plug the associated pod and node into getPrometheusData (send a complete promQL query) Specifically for OomKill
  //we will receive back the data point from prometheus
  //send this data point to checkForOomkill. If it returns true. We need to build an alert with createAlert.
  for(let i = 0; i < podsList.length; i++){
    const memUsageQuery = 'container_memory_usage_bytes'; //need this to give to createAlert

    //fetching relevant data from the pods
    const memUsage:any = await getPrometheusData(podsList[i].pod, 'container_memory_usage_bytes');
    const memLimit:any = await getPrometheusData(podsList[i].pod, 'container_spec_memory_limit_bytes');

    //evaluating if there is a possible oomkill
    const oomkill = checkForOomkill(memUsage, memLimit);

    //checking if the alert already exists in db.json
    const existsResult = await dbController.checkIfAlertAlreadyExists({pod: podsList[i].pod, issue: oomkillIssue});

    //if there IS an oomkill and the alert does not exist:enter if statement
    if(oomkill && !existsResult){
      //create an alert
      await createAlert(podsList[i].node, podsList[i].pod, oomkillIssue, memUsage, memLimit, memUsageQuery);
    }
  }
}

startHeartbeat();  //single call for when app starts
setInterval(startHeartbeat, 60000); //One minute intervals since Prometheus by default only scrapes every minute.





