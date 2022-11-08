

interface PodNode {
  pod: string
  node: string
}
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const YAML = require('yaml');
/*


items[0].metadata.name to get the pod name
items[0].spec.nodename to get node name

notes on locations of cpu/memory limits:
items[0]. : 
spec.container.resources.limits.cpu
spec.container.resources.limits.memory
spec.container.resources.requests.cpu
spec.container.resources.requests.memory

items.spec.containers.resources --> limits and requests

(returning a list of pod names)
All the list items. 
metadata.name



return an array of user deployed pods and the nodes they're in.
[[podname, nodename], [podname, nodename]]
[{pod: podname, node: nodename}, {pod:podname, node:nodename}]     do this one, it's more descriptive. 


// items[0].metadata.name to get the pod name
// items[0].spec.nodename to get node name
*/



const getPods = async() => {
  console.log('doing getPods');

    const { stdout, stderr } = await exec('kubectl get pods -o yaml');
    const yamls = YAML.parse(stdout).items;
        
    const arrPodsNodes:PodNode[] = [];          //[{}, {}]
        
    yamls.forEach((el:any) => {
        const name = el.metadata.name;
        const node = el.spec.nodeName;
        const obj = {pod: name, node: node};
        arrPodsNodes.push(obj)
    })
    console.log(arrPodsNodes)
    return arrPodsNodes;
}


//     return exec("kubectl get pods -o yaml", (error:any, stdout:any, stderr:any) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             // return;
//         }
//         // console.log(`stdout: ${stdout}`);
//         const yamls = YAML.parse(stdout).items;
        
//         const arrPodsNodes:PodNode[] = [];          //[{}, {}]
        
//         yamls.forEach((el:any) => {
//             const name = el.metadata.name;
//             const node = el.spec.nodeName;
//             const obj = {pod: name, node: node};
//             arrPodsNodes.push(obj)
//         })
//         console.log(arrPodsNodes)
//         return arrPodsNodes;



// });

//console.log(getPods());

export default getPods;