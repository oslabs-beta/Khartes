/*
This is to make a map of what's in our cluster. 
We want to get what nodes are there, and what pods are inside those nodes. 

I would like to return an object with keys being nodes, values being objects with key/value pairs being pods.
//

Div node     inside that have divs for pod, pod, pod. 

turn
   [{pod: podname, node: nodename}, {pod:podname, node:nodename}]

into 
   {nodename:[podname, podname, podname], nodename:[podname, podname, podname]}


make our mapObject ={}
loop through array items. 
  on each item, add item.node: [];
  on each item,mapObject[item.node].push(item.pod)
  

*/

//import { response } from 'express';
// const getPods = require('./Controllers/getPods');


const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const YAML = require('yaml');


export async function mapMaker (request, response, next){
        
  //get everything I need.
  ourPods = await getPods();
  console.log("our pod list is...", ourPods)
  let mapObject = {};

  //convert to object with arrays.
  ourPods.forEach(element => {
    mapObject[element[1].node] = element[0].pod;
  });
  
  //write the map to the response.
  console.log("Our map is... ", mapObject);
  response.locals.map = mapObject;

  return next();
};


async function getPods(){ 
  
  const { stdout, stderr } = await exec('kubectl get pods -o yaml');

  const yamls = YAML.parse(stdout).items;
    
  const arrPodsNodes = [];

  yamls.forEach((el) => {
    const name = el.metadata.name;
    const node = el.spec.nodeName;
    const obj = {pod: name, node: node};
    arrPodsNodes.push(obj)
  })
  return arrPodsNodes;
};
