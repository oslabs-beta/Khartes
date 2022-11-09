/*
Get historical Prometheus data to add to the alert object. 

Only triggered once Heartbeat decides to make an alert object. 

Need to get back ONLY historical data on relevant and specific container/pod/node/cluster. 

Will need identity sent to it so we can filter. 

Fetch method with very specific request. 

How are we doing the port forwarding? 


return array of arrays. Each item is [time, data].

*/
const axios = require('axios');

export const getHistoricalPrometheusData = async (pod: string, query: string) => {
  try {
    console.log("we're inside getHistoricalPrometheusData")
    const queryResult = await axios.get(`http://localhost:1337/api/v1/query?query=${query}{pod="${pod}"}[60m]`)
    for (let i = 0; i < queryResult.data.data.result[0].values.length; i++) {
      queryResult.data.data.result[0].values[i][1] = Number(queryResult.data.data.result[0].values[i][1]);
    }
    return queryResult.data.data.result[0].values; 
  }
  catch {
    console.log("error in fetching historical prometheus data");
    return;
  }
}