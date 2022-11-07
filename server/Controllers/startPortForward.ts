const {exec} = require('child_process');
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

export const startPortForward = ():void => {
  let allPodsYamlObject:any = {};
  exec("kubectl get pods -A -o yaml", (error: any, output: any, stderr:string) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      allPodsYamlObject = YAML.parse(output);
  });

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




  //portforward on app opening
  exec(`kubectl --namespace ${namespace} ${podName} 1337:9090`, (error:any, stdout:any, stderr:any) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });
};