/*
Get historical Prometheus data to add to the alert object. 

Only triggered once Heartbeat decides to make an alert object. 

Need to get back ONLY historical data on relevant and specific container/pod/node/cluster. 

Will need identity sent to it so we can filter. 

Fetch method with very specific request. 

How are we doing the port forwarding? 


return array of arrays. Each item is [time, data].

*/

export const getHistoricalPrometheusData = async (pod: string, query: string) => {
  try {
    const queryResult = await fetch(`http:localhost:1337/api/v1/query?query=${query}{pod=${pod}}[60m]`)
    const info:any = queryResult.json();     //[1234.12, 1234]
    console.log(info);
    console.log(info.data.result[0].values)
    return info.data.result[0].values; 
  }
  catch {
    console.log("error in fetching historical prometheus data");
    return;
  }
}