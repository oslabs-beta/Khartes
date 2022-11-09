/*
We need to serve up:
  /alerts         do a DB pull and serve an array of alert objects.
  POST /fix           change yaml file per user input. This will send the whole alert object from front end which includes the old yaml.
                      We will strip the container section, change it and send it back in the response.


  *potential additions*
  /yamls        serve up fixed yaml files
  /push         push yaml file to github
  /write        write yaml file to disk
  /deploy       apply yaml fixes to the cluster/namespace?

*/




//Set up stuff
import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
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


app.get('/alerts', 
holler,
  dbController.getAllAlerts,
  (request: Request, response: Response ) => {response.json(response.locals.db);}
  );


//deprecated
// app.patch('/alerts/:id/:status', 
//   dbController.updateStatusById,
//   (request: Request, response: Response ) => {response.json(response.locals.updated);}
//   );

  app.put('/alerts/:id', 
  holler,
  dbController.updateByAlertObject,
  // holler,
  // (request: Request, response: Response ) => {response.json(response.locals.updated);}
  (request: Request, response: Response ) => {response.json("we made it back");}
  );

app.delete('/alerts/:id', 
  dbController.deleteById,
  (request: Request, response: Response ) => {response.json(response.locals.deleted);}
  );

  //deprecated
  // app.patch('/fix/:percentage',
  // fixTheYaml,
  // (request: Request, response: Response ) => {response.json(response.locals.updated);}
  // );

  app.patch('/fix/:percentage',
  fixTheYaml,
  dbController.updateByAlertObject,
  (request: Request, response: Response ) => {response.json(response.locals.updated);}
  );


app.get('/polo', (req: Request, res: Response) => {
  res.send('Polo!');
});


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


// import express, { Express, Request, Response } from 'express';
// const ffmpegPath  = require('ffmpeg-static');
// const Stream      = require('node-rtsp-stream');

// const app: Express = express();

// let server = app.listen(3000);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });



