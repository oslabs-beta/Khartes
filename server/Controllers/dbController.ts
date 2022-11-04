/*
This writes and reads to the json object we're using as a "fake" database. 
This is going to use node fs. 
Read
Write       overwrites by default. Do we want that? No. Need to append, but doesn't work
exists      takes in baby object (pod, issue) and checks against already existing alert objects in the DB.
delete      deletes alert object. 
update      given an ID and a status, update the alert object. 
*/

/*Current Errors


*/



//setup stuff
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';



export const dbController = {
    
    //get all of the alerts.
    read: async (request: Request, response: Response, next: NextFunction) => {
        
        //read from DB
        const db = await fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')
        
        //turn into array of alert objects and add to response.locals
        response.locals.db = JSON.parse(db);
        
        return next();
    },

    //Need to put in a new alert. 
    //assume it's coming in on request body.
    //Can't just append. 
    //Will need to read it, json parse it to an array of objects, and push new object.
    //Then restringify and write it. 
    write: async (request: Request, response: Response, next: NextFunction) => {
        
        //get new alert, db as text, and db as array of alert objects. 
        const newAlert = request.body;                                                                      //Might need to change this in future?
        const dbAsText:string = await fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')
        const dbAsArray = JSON.parse(dbAsText);
        
        //push new alert onto array of alert objects.
        dbAsArray.push(newAlert);
        
        //write it all back to the DB.
        await fs.writeFileSync(path.join(__dirname, '../../server/db.json'), JSON.stringify(dbAsArray));
        
        return next();
    },
    
};



