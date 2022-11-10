


const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const YAML = require('yaml');

interface PodNode {
  pod: string
  node: string
}

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


return an array of user deployed pods and the nodes they're in.
[{pod: podname, node: nodename}, {pod:podname, node:nodename}]

*/


const getPods = async() => {

    const { stdout, stderr } = await exec('kubectl get pods -o yaml');

    const yamls = YAML.parse(stdout).items;
        
    const arrPodsNodes:PodNode[] = [];
        
    yamls.forEach((el:any) => {
        const name = el.metadata.name;
        const node = el.spec.nodeName;
        const obj = {pod: name, node: node};
        arrPodsNodes.push(obj)
    })
    return arrPodsNodes;
}


export default getPods;