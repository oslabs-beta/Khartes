const util = require('node:util');
const exec = util.promisify(require('child_process').exec);
const YAML = require('yaml');

/* 

  Gathers that information necessary to automatically port-forward
  the users Prometheus server to localhost:9090

*/



export const startPortForward = async():Promise<void> => {
  //run the kubectl command for all pods
  const { stdout, stderr } = await exec('kubectl get pods -A -o yaml');

  //turn it into a yaml
  const allPodsYamlObject = YAML.parse(stdout);
  
  //a for loop to iterate through the resulting array and search for the correct pod
  //that meets our conditions 
  //items[index].metadata.labels.app = prometheus
  //items[index].metadata.labels.component = server
  let namespace = '';
  let podName = '';
  
  for(let i = 0; i < allPodsYamlObject.items.length; i++){
    if(allPodsYamlObject.items[i].metadata.labels.app === "prometheus" && allPodsYamlObject.items[i].metadata.labels.component === "server"){
      //if those conditions are met, we grab the following info from that array index
      namespace = allPodsYamlObject.items[i].metadata.namespace;
      podName = allPodsYamlObject.items[i].metadata.name;
    }
  }


  //portforward on app opening
  // this command works, but we need to figure out how to run it concurrently
  //await exec(`kubectl --namespace ${namespace} port-forward ${podName} 9090`)
  
};