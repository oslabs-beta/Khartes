/*
This writes and reads to the json object we're using as a "fake" database. 
This is going to use node fs. 
Read        returns all of the alert objects in the db as an array of objects.
Write       overwrites by default. Do we want that? No. Need to append, but doesn't work
exists      takes in baby object (pod, issue) and checks against already existing alert objects in the DB.
delete      deletes alert object. 
update      given an ID and a status, update the alert object. 
*/





/*To Do
test checkIfAlertAlreadyExists
test    writeNewAlertToDb
write error handling


*/



//setup stuff
import { Request, Response, NextFunction } from 'express';
const fs = require('fs');
const path = require('path')




export const dbController = {
    
    //get all of the alerts.
    getAllAlerts: async (request: Request, response: Response, next: NextFunction) => {
        
        //read from DB
        const db = await fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')
        
        //turn into array of alert objects and add to response.locals
        response.locals.db = JSON.parse(db);
        
        return next();
    },




    //Deprecated! Keeping here just in case, but needs to be deleted eventually. 
    //Need to update an alert status.
    //ID and new status should come in as parameters.
    //Will need to read it, json parse it to an array of objects, change it...
    //Then restringify and write it. 
    updateStatusById: async (request: Request, response: Response, next: NextFunction) => {
        
        //get everything I need.
        const id:number = parseInt(request.params.id);
        const newStatus:string = request.params.status;                                                                  //Might need to change this in future?
        const dbAsText:string = await fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')
        const dbAsArray = JSON.parse(dbAsText);
        
        //find appropriate alert object  [{}, {}, {}]
        //And change it's status. 
        for(let index = 0; index < dbAsArray.length; index++){
            if(dbAsArray[index].id === id){
                dbAsArray[index].status = newStatus;
                response.locals.updated = dbAsArray[index];
            }
        }
        
        //write it all back to the DB.
        await fs.writeFileSync(path.join(__dirname, '../../../server/db.json'), JSON.stringify(dbAsArray));
        
        return next();
    },

    //Need to update an alert object for anything.
    //object should come in on request body.
    //Will need to read it, change it...
    //Then restringify and write it. 
    updateByAlertObject: async (request: Request, response: Response, next: NextFunction) => {

        //get everything I need.
        const id:number = parseInt(request.body.id);
        const updatedAlertObject:any = request.body;
        const dbAsText:string = await fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')
        const dbAsArray = JSON.parse(dbAsText);
        
        console.log(dbAsArray);
        //find appropriate alert object  [{}, {}, {}]
        //And change it's status. 
        for(let index = 0; index < dbAsArray.length; index++){
            if(dbAsArray[index].id === id){  //
                dbAsArray[index] = updatedAlertObject;
                response.locals.updated = updatedAlertObject;
            }
        }
        console.log(response.locals.updated);
        //write it all back to the DB.
        await fs.writeFileSync(path.join(__dirname, '../../../server/db.json'), JSON.stringify(dbAsArray));
        return next();
    },

    //Need to update an alert status.
    //ID and new status should come in as parameters.
    //Will need to read it, json parse it to an array of objects, change it...
    //Then restringify and write it. 
    addNewYamlById: async (request: Request, response: Response, next: NextFunction) => {
        
        //get everything I need.
        const id:number = parseInt(request.params.id);
        const newYaml:string = request.params.newYaml;                                                                  //Might need to change this in future?
        const dbAsText:string = await fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')
        const dbAsArray = JSON.parse(dbAsText);
        
        //find appropriate alert object  [{}, {}, {}]
        //And add new YAML. 
        for(let index = 0; index < dbAsArray.length; index++){
            if(dbAsArray[index].id === id){
                dbAsArray[index].newYaml = newYaml;
                response.locals.updated = dbAsArray[index];
            }
        }
        
        //write it all back to the DB.
        await fs.writeFileSync(path.join(__dirname, '../../../server/db.json'), JSON.stringify(dbAsArray));
        
        return next();
    },

    deleteById: async (request: Request, response: Response, next: NextFunction) => {
        
        //get everything I need.
        const id:number = parseInt(request.params.id);
        const dbAsText:string = await fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')
        const dbAsArray = JSON.parse(dbAsText);
        
        //find appropriate alert object  [{}, {}, {}]
        //And delete it. Use splice. 
        //while loop, checking dbAsArray[counter].id
        //remember to grab deleted alert to return it. 
        const newDbAsArray = [];
        let counter = 0;

        while(newDbAsArray[0] === undefined){
            if(dbAsArray[counter].id === id){ 
                response.locals.deleted = dbAsArray[counter];
                //use slice to remove the one we don't want. 
                //Alerts before our deleted alert
                newDbAsArray.push(...dbAsArray.slice(0,counter));
                //Alerts after our deleted alert
                newDbAsArray.push(...dbAsArray.slice(counter + 1))
            }
            counter++;
        }
        
        //write it all back to the DB.
        await fs.writeFileSync(path.join(__dirname, '../../../server/db.json'), JSON.stringify(newDbAsArray));

        return next();
    },

    
    //Need to put in a new alert. 
    //NOT coming from FE, coming from heartbeat when it creates an alert for the FE. 
    //So argument is just an object. 
    //Can't just append. 
    //Will need to read it, json parse it to an array of objects, and push new object.
    //Then restringify and write it. 
    writeNewAlertToDb: async (newAlert:object) => {
        
        //get new alert, db as text, and db as array of alert objects.                                                                    //Might need to change this in future?
        const dbAsText:string = await fs.readFileSync(path.join(__dirname, '../../server/db.json'), 'utf8')
        const dbAsArray = JSON.parse(dbAsText);
        
        //push new alert onto array of alert objects.
        dbAsArray.push(newAlert);
        
        //write it all back to the DB.
        await fs.writeFileSync(path.join(__dirname, '../../server/db.json'), JSON.stringify(dbAsArray));
        
        return 'Done';
    },

    //
    checkIfAlertAlreadyExists: async (babyAlert:any) => {
        //{{pod: name, issue: oomkillIssue}}
        console.log("we're inside checkIfAlertAlreadyExists");
        //get new alert, db as text, and db as array of alert objects.                                                              //Might need to change this in future?
        const dbAsText:string = await fs.readFileSync(path.join(__dirname, '../../server/db.json'), 'utf8')
        const dbAsArray = JSON.parse(dbAsText);
        
        //check if it's there.
        for(let index = 0; index < dbAsArray.length; index++){
            if(dbAsArray[index].pod === babyAlert.pod && dbAsArray[index].issue === babyAlert.issue){
                console.log('checkIfAlertAlreadyExists returning true')
                return true;
            }
        }
        console.log('checkIfAlertAlreadyExists returning false')
        return false;
    },


};



