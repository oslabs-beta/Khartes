const axios = require('axios');

/*

  Get request to prometheus server for specified pod or node with specified query.

  /api/v1/query?query=X

  X is promQL query for the metric we want.
    
  We get back an object.  
  We will get back multiple. We want the one that has a container property.
  data.result[0]

  example query:
  localhost:9090/api/v1/query?query=container_memory_usage_bytes{pod="deployment-polo-67cd6dd5cf-54vbd"}

*/


const getPrometheusData = async (podName: string, query: string, nodeName?: string) => {
  //this allows this function to handle node names as well. Incase we need node metrics.
  let podOrNode = "pod";
  // if there is a nodeName, overwrite podName to nodeName
  if (nodeName) {
      podName = nodeName;
      podOrNode = "node";
  }

  try {
    //Prometheus api query using promQL(Prometheus Query Language)
    const queryResult = await axios.get(`http://localhost:9090/api/v1/query?query=${query}{${podOrNode}="${podName}"}`)
          
    return queryResult.data.data.result[0].value; 
  }
  catch {
    console.log("error in fetching prometheus data");
    return;
  }
}

export default getPrometheusData;