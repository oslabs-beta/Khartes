const util = require('node:util');
const exec = util.promisify(require('child_process').exec);
const YAML = require('yaml');

/* Port Forwarding Notes on Prometheus. 
kubectl get pods -A -o yaml will get the yaml for all the pods. One of those will have the Prometheus server in it. 
Will have "items[index].metadata.labels.component = server"
We also need the namespace! 
items[index].metadata.namespace
We need the node name...
items[index].metadata.name
items[index].metadata.labels.app = prometheus
*/

//run the kubectl command for all pods
//turn it into a yaml

export const startPortForward = async():Promise<void> => {
  //console.log('Are we going into starPortForward function? Yes?');
  const { stdout, stderr } = await exec('kubectl get pods -A -o yaml');
  // console.log('this is our output', typeof stdout)
  const allPodsYamlObject = YAML.parse(stdout);
  
  //console.log('This is what we got from startPortForward: ', allPodsYamlObject)
  //a for loop to iterate through the resulting array and search for the correct pod
  //that meets our conditions 
  //items[index].metadata.labels.app = prometheus
  //items[index].metadata.labels.component = server
  let namespace = '';
  let podName = '';
  for(let i = 0; i < allPodsYamlObject.items.length; i++){
    if(allPodsYamlObject.items[i].metadata.labels.app === "prometheus" && allPodsYamlObject.items[i].metadata.labels.component === "server"){
      //if those conditions are met, we grab the following info from that array index
      //items[index].metadata.name = podname
      //items[index].metadata.namespace
      namespace = allPodsYamlObject.items[i].metadata.namespace;
      podName = allPodsYamlObject.items[i].metadata.name;
    }
  }



  console.log(namespace, podName)
  //portforward on app opening
  // this command works, but we need to figure out how to run it concurrently
  await exec(`kubectl --namespace ${namespace} port-forward ${podName}  1337:9090 &`)
  //exec('kubectl --namespace monitoring port-forward prometheus-server-5b87dc7765-cfp9t 1337:9090');
  // exec(`kubectl --namespace ${namespace} port-forward ${podName} 1337:9090`, (error:any, stdout:any, stderr:any) => {
  //   console.log('inside the port forward')
  // });
};