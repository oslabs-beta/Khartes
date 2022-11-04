// Need to get container info from specific container/pod?
// it will be passed a pod name
// grabbing yaml file for specific pod
// import {exec} from 'child_process';
// import { ModuleFilenameHelpers } from 'webpack';
// import * as YAML from 'yaml';
var exec = require('child_process').exec;
var ModuleFilenameHelpers = require('webpack').ModuleFilenameHelpers;
var YAML = require('yaml');
// exec("kubectl get deploy marco -o yaml", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// })
/*
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
var getPodYaml = function (podname) {
    return exec("kubectl get pod ".concat(podname, " -o yaml"), function (error, stdout, stderr) {
        if (error) {
            console.log("error: ".concat(error.message));
            return;
        }
        if (stderr) {
            console.log("stderr: ".concat(stderr));
            // return;
            // it runs an stderr, but it still continues to write code
        }
        // console.log(`stdout: ${stdout}`);
        var yamls = YAML.parse(stdout);
        var containerYaml = yamls.spec.containers;
        console.log(yamls.spec.containers);
        // console.log(yamls.items[0]);
        // const arrPodsNodes = []; //{pod: podname, node: nodename}
        // for each item in yamls.items, push an obj as above
        // yamls.forEach((el) => {
        //     const name = el.metadata.name;
        //     const node = el.spec.nodename;
        //     arrPodsNodes.push
        // })
        return containerYaml;
        //         items[0].metadata.name to get the pod name
        // items[0].spec.nodename to get node name
    });
};
console.log(getPodYaml('deployment-memoryuser-564878964b-8kvtg'));
//kubectl get pod (podname) -o yaml