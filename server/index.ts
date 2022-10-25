import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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



