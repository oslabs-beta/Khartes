/*
GET to /alerts
PATCH to /alerts
DELETE to alerts/id

PATCH to /fix/percentage



*/




//Set up stuff
import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

//Get the controllers
import {dbController} from './Controllers/dbController';
import fixTheYaml from './Controllers/fixTheYaml';

//automagically destring incoming JSON
app.use(express.json());




//serve up alert objects
app.get('/alerts', 
  dbController.getAllAlerts,
  (request: Request, response: Response ) => {response.json(response.locals.db);}
  );



//send BE an altered alert object and the DB will update it. 
app.patch('/alerts', 
  dbController.updateByAlertObject,
  (request: Request, response: Response ) => {response.json(response.locals.updated);}
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



