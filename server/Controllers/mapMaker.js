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

import { response } from 'express';
import getPods from './getPods';


const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const YAML = require('yaml');


default export async function mapMaker (request: Request, response: Response, next: NextFunction) => {
        
  //get everything I need.
  ourPods = await getPods();
  let mapObject = {};

  
  
  //write the map to the response.
  response.locals.map = 

  return next();
},


