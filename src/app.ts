
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import globalErrorHandler from "./app/middlwares/globalErrorHandler";
import notFound from "./app/middlwares/notFound";
import router from "./app/routes";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1", router);


// //controller function
// const test = (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };

// //api route
// app.get('/', test);

// console.log(process.cwd());
//D:\nextlevel\module-8.env

//global error handler
app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;
