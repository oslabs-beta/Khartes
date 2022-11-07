/* What I need this to do...
Take in the alert object (in the body) and the percentage that the client wants the limits bumped by (in the params). 


Will then go to dbController.updateYamlById
    Needs params.id, params.newYaml as text

*/

//setup stuff
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import YAML from ('yaml');

//make the new yaml
export const makeNewYaml: async (request: Request, response: Response, next: NextFunction) => {
    
    //get everything I need to make the new yaml
    //id            off body.id?
    //percentage    off params.id
    //oldYaml       off body.oldyaml?
    //newYaml       parsed oldYaml
    
    const percentageToFixBy:number = parseInt(request.params.percentage)
    const oldYaml:string = request.body.oldYaml;
    let newYaml:any = YAML.parse(oldYaml);

    // I want to change yaml[0].resources.limits.memory. 
    // but it's text. "200M". How to parse? Separate numbers and letters, change numbers, restringify, add back together. 
    // const test = "200M";

    // const numbers = Number(test.replace(/\D/g, ''));
    // console.log(numbers);

    
    let numberPartOfString:string = 
    let stringPartOfString:string = 

    newYaml[0].resources.limits.memory *= (1 + (percentageToFixBy / 100));

    //Now off to dbController.updateYamlById. 
    request.params.id = parseInt(request.body.id);  //why is params.id a string? Look into request interface.
    request.params.newYaml = newYaml;

    return next();
}

