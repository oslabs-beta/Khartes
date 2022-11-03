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

//Get the controllers
import {dbController} from './Controllers/dbController';



app.get('/alerts', 
  dbController.read,
  (request: Request, response: Response ) => {response.json(response.locals.db);}
  );


app.patch('/alerts/:id/:status', 
  dbController.update,
  (request: Request, response: Response ) => {response.json(response.locals.db);}
  );

app.delete('/alerts/:id', 
  dbController.delete,
  (request: Request, response: Response ) => {response.json(response.locals.db);}
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



