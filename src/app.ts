import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();
const port = 3000;

//parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  var a = 10;

  res.send(a);
});

// console.log(process.cwd());
//D:\nextlevel\module-8.env

export default app;
