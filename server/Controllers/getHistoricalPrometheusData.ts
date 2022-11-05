/*
Get historical Prometheus data to add to the alert object. 

Only triggered once Heartbeat decides to make an alert object. 

Need to get back ONLY historical data on relevant and specific container/pod/node/cluster. 

Will need identity sent to it so we can filter. 

Fetch method with very specific request. 

How are we doing the port forwarding? 


return array of arrays. Each item is [time, data].

*/

export const getHistoricalPrometheusData = (pod) => {

}