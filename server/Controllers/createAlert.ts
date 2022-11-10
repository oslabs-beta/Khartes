import getPodContainer from "./getPodContainer";
import {getHistoricalPrometheusData} from "./getHistoricalPrometheusData";
import { dbController } from "./dbController";
import { AlertsInterface } from '../../Types/Types';

/*

  This creates an alert object. 
  We are taking in: node, pod, issue, metric, limit, and query from heartbeat. 
  We will get the rest of the data and write it to the DB here. 

*/

export const createAlert = async (node:string, pod:string, issue:string, metric:number, limit:number, query:string) => {
  //create an ID prop
  const id = Math.floor(Math.random() * 1000000000);
  //add issue prop: issue
  //add status prop: 'new'
  //add node prop: node
  //add pod prop: pod
  //add container prop: ''  //we dont use this property but we might want it down the line
  //add metric: metric
  //add limit: limit
  //add historicalMetrics prop: call getHistoricalPrometheusData
  const history = await getHistoricalPrometheusData(pod, query);
  //add oldyaml prop: call getPodContainer
  const oldyaml = await getPodContainer(pod);
  //add newyaml prop: blank (adjusted yaml values are added here when fix button is pushed on frontend)


  const newAlertObject: AlertsInterface = {
      id: id,
      issue: issue,
      status: 'new',
      node: node,
      pod: pod,
      container: '',
      metric: metric,
      limit: limit,
      historicalMetrics: history,
      oldYaml: oldyaml,
      newYaml: '',
      comments: []
  }

  //write the newAlertObject to the DB
  dbController.writeNewAlertToDb(newAlertObject);

}
