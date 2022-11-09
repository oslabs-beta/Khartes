/* What I need this to do...
Take in the alert object (in the body) and the percentage that the client wants the limits bumped by (in the params). 

increase memory limits by percentage.
update {alert}.newYaml

Will then go to dbController.updateYaml, sending 

*/

//setup stuff
import { Request, Response, NextFunction } from 'express';
import path from 'path';
const YAML = require('yaml');

//make the new yaml
export default function makeNewYaml(request: Request, response: Response, next: NextFunction): void {
    
    //As of right now, this works ONLY for OOMkill. 
    //We need some logic here to differentiate different fixes. 


    
    //get everything I need to make the new yaml
    //id            off body.id?
    //percentage    off params.id
    //oldYaml       off body.oldyaml?
    //newYaml       parsed oldYaml
    const percentageToFixBy:any = request.params.percentage;
    const oldYaml:any = request.body.oldYaml;
    let newYaml:any = YAML.parse(oldYaml);
    let newLimit:any = newYaml[0].resources.limits.memory;


    // I want to change yaml[0].resources.limits.memory. 
    // but it's text. "200M". How to parse? Separate numbers and letters, change numbers, restringify, add back together.
    let numberPartOfString:number = Number(newLimit.replace(/\D/g, ''));  //regex, all NON digit characters erased.
    let stringPartOfString:string = newLimit.replace(/\d/g, '');  //regex, all DIGIT characters erased.
    //incrase limit by percentage.
    numberPartOfString *= (1 + (percentageToFixBy / 100));
    //stitch back together
    newYaml[0].resources.limits.memory = numberPartOfString.toString() + stringPartOfString;

    console.log('percentage to fix by: ', percentageToFixBy)
    console.log('number part of our string is: ', numberPartOfString, typeof numberPartOfString)
    console.log('string part of our string is: ', stringPartOfString, typeof stringPartOfString)
    console.log('This is our new limit in the new yaml: ', newYaml[0].resources.limits.memory, typeof newYaml[0].resources.limits.memory)


    //update the object.
    request.body.newYaml = YAML.stringify(newYaml);
    //Now off to dbController.updateYamlById. 
    return next();
}

