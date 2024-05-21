import { StudentRoutes } from "./app/modules/student/student.route";
import cors from "cors";
import express, { Application } from "express";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1/students", StudentRoutes);

// //controller function
// const getAController = (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };

// //api route
// app.get('/', getAController);

// console.log(process.cwd());
//D:\nextlevel\module-8.env

export default app;
