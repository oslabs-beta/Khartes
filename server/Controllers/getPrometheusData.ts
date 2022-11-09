/*
fetch request to prometheus server. 
    How do we know the IP? 

    /api/v1/query?query=X

    X is metric we want.
    
    We get back an object.  
    We will get back multiple. We want the one that has a container property.
    data.result[1]

    container_memory_usage_bytes{pod="deployment-polo-67cd6dd5cf-54vbd"}
    localhost:9090/api/v1/query?query=container_memory_usage_bytes{pod="deployment-polo-67cd6dd5cf-54vbd"}[5m]

returns one data point

    //data.result[0].value

*/
const axios = require('axios');

const getPrometheusData = async (podName: string, query: string, nodeName?: string) => {
    let podOrNode = "pod";
    // if there is a nodeName, overwrite podName to nodeName
    if (nodeName) {
        podName = nodeName;
        podOrNode = "node";
    }
    console.log("we are inside the getPrometheusData")
    try {
            // `http://localhost:1337/api/v1/query?query=${query}{${podOrNode}="${podName}"}`
            const queryResult = await axios.get(`http://localhost:1337/api/v1/query?query=${query}{${podOrNode}="${podName}"}`)
            //http://localhost:1337/api/v1/query?query=container_memory_usage_bytes{pod="deployment-polo-67cd6dd5cf-6hwhp"}
            // const info:any = queryResult.json();     //[1234.12, 1234]
            //console.log(queryResult);
            //console.log(queryResult.data.result[0].value)
            return queryResult.data.data.result[0].value; 
        }
        catch {
            console.log("error in fetching prometheus data");
            return;
        }
}

// async function getUser() {
//     try {
//       const response = await axios.get('/user?ID=12345');
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }
      



export default getPrometheusData;