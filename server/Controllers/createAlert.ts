/*
This should create an Alert Object. 
We are taking in: node, pod, and issue from heartbeat. 
We will get the rest of the data and write it to the DB here. 

{
id: 12345678,
Issue: text,
status: resolv ed/new
node: name,
pod: name,
container: name,
metrics: {limits: X,
data: Y,},
historicalMetrics: ?
oldyaml: yamlString
newyaml: yamlString
}




Math.floor(Math.random() * 1000000000);
*/

interface newAlertObject {
  id: number
  issue: string
  status: string
  node: string
  pod: string
  container: string
  metric: number
  limit: number
  historicalMetrics: any[][]                //[[number, string],[number, string]]     //can also create a numberOrString type and use that. 
  oldyaml: string
  newyaml: string
  
}

import getPodContainer from "./getPodContainer";


const createAlert = (node:String, pod:String, issue:String) => {
  //create an ID prop
  //add issue prop: issue
  //add status prop: 'new'
  //add node prop: node
  //add pod prop: pod
  //add metrics: call getPodContainer
  //add historicalMetrics prop: call getHistoricalPrometheusData
  //add oldyaml prop: call getPodContainer
  //add newyaml prop: blank (something is added here when fix button is pushed on frontend)





}

export default createAlert;