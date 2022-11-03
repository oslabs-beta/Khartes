/*
This writes and reads to the json object we're using as a "fake" database. 
This is going to use node fs. 
Read
Write       overwrites by default. Do we want that? 
exists      takes in baby object (pod, issue) and checks against already existing alert objects in the DB. 
delete      delets alert object. 
update      given an ID and a status, update the alert object. 
*/

/*Current Errors
Looks like our JSON objects are formatted incorrectly? Fix that. 

*/



//setup stuff
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';



//read db.json
//destring it into an object
//attach to response.locals.db
export const dbController = {
    
    read: async (request: Request, response: Response, next: NextFunction) => {
        //console.log('Where are we?', __dirname);
        const db = await fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')
        //console.log('What is db?', db, typeof db)
        response.locals.db = JSON.parse(db);
        return next();
    }

    
};



