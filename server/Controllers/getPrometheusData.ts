/*
fetch request to prometheus server. 
    How do we know the IP? 

    /api/v1/query?query=X

    X is metric we want.
    
    We get back an object.  
    We will get back multiple. We want the one that has a container property.
    data.result[1]

    container_memory_usage_bytes{pod="deployment-polo-67cd6dd5cf-54vbd"}

returns one data point

    


*/