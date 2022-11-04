// import {exec} from 'child_process';
// import { ModuleFilenameHelpers } from 'webpack';
// import * as YAML from 'yaml';

const { exec } = require('child_process')
const { ModuleFilenameHelpers } = require('webpack');
const YAML = require('yaml');
/*
exec("kubectl get deploy marco -o yaml", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
})

Get a list of pods in the system.$
use kubectl to get pods as a yaml,
// do command to get the YAML (kubectl get pods -o yaml)

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

*/

const getPodYamls = () => {
    
    return exec("kubectl get pods -o yaml", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            // return;
        }
        // console.log(`stdout: ${stdout}`);
        const yamls = YAML.parse(stdout).items;
    
        const arrPodsNodes = [];
        
        yamls.forEach((el) => {
            const name = el.metadata.name;
            const node = el.spec.nodeName;
            const obj = {name: null, node: null};
            obj.name = name;
            obj.node = node;
            arrPodsNodes.push(obj)
        })
        console.log(arrPodsNodes)
        return arrPodsNodes;


//         items[0].metadata.name to get the pod name
// items[0].spec.nodename to get node name
});
}

console.log(getPodYamls());
// getPodYamls();

export default getPodYamls;