/*
This writes and reads to the json object we're using as a "fake" database. 
This is going to use node fs. 

Read

Write       overwrites by default. Do we want that? 

exists      takes in baby object (pod, issue) and checks against already existing alert objects in the DB. 

delete      delets alert object. 

*/


//setup stuff
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';



//read db.json
//destring it into an object
//attach to response.locals.db
export const dbController = {
    read: async (request, response, next) => {
        const db = fs.readFileSync(path.join(__dirname, '../db.json'), 'urf8')
        response.locals.db = JSON.parse(db);
    }
};



