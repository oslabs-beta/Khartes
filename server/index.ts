/*
GET to /alerts
PUT to /alerts
DELETE to alerts/id

PATCH to /fix/percentage
*/

import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;


//express middleware stuff
//automagically destring incoming JSON
app.use(express.json());

//Get the controllers
import {dbController} from './Controllers/dbController';
import fixTheYaml from './Controllers/fixTheYaml';

// My little tester middleware for seeing what's what.
const holler = (request: Request, response: Response, next: NextFunction) => {
  console.log(' \n\nHoller!');
  console.log('request body is...', request.body, typeof request.body);
  console.log('request params are...', request.params);
  console.log('request queries are...', request.query);
  console.log('response locals are...', response.locals, typeof response.locals);
  // console.log('response body is...', response.body, typeof response.body);
  console.log('\n\n');
  return next();
};

//automagically destring incoming JSON
app.use(express.json());


//serve static assets
app.use(express.static(path.join(__dirname, '../client/assets/')));

//serve up alert objects
app.get('/alerts', 
// holler,
  dbController.getAllAlerts,
  (request: Request, response: Response ) => {response.json(response.locals.db);}
  );


//take in alert objects to update the DB. 
app.put('/alerts', 
  // holler,
  dbController.updateByAlertObject,
  // holler,
  (request: Request, response: Response ) => {response.json(response.locals.updated);}
  // (request: Request, response: Response ) => {response.json("we made it back");}
  );

//send an id and it will be deleted from the DB. Send as parameter. IE: /alerts/123456789 deletes 123456789 from DB.
app.delete('/alerts/:id', 
  dbController.deleteById,
  (request: Request, response: Response ) => {response.json(response.locals.deleted);}
  );

//send an alert object and a percentage to increase the limits by.
app.patch('/fix/:percentage',
  fixTheYaml,
  dbController.updateByAlertObject,
  (request: Request, response: Response ) => {response.json(response.locals.updated);}
  );



//testing purposes, no longer required. 
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});



