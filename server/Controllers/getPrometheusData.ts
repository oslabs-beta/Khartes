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
const getPrometheusData = async (podName: string, query: string, nodeName?: string) => {
    let podOrNode = "pod";
    // if there is a nodeName, overwrite podName to nodeName
    if (nodeName) {
        podName = nodeName;
        podOrNode = "node";
    }
        try {
            const queryResult = await fetch(`http:localhost:9090/api/v1/query?query=${query}{${podOrNode}=${podName}}`)
            let info = queryResult.json();
            console.log(info.data.result[0].value)
            return info.data.result[0].value; 
        }
        catch {
            console.log("error in fetching prometheus data");
            return;
        }
        
}
      



export default getPrometheusData;