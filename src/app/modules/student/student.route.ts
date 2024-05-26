import { StudentControllers } from "./student.controller";
import express from "express";

const router = express.Router();

//will call controller functionn
//POST data
//router.post("/create-student", StudentControllers.createStudent);
//GET all data
router.get("/", StudentControllers.getAllStudents);
//GET single student data by ID
router.get("/:studentId", StudentControllers.getSingleStudent);
export const StudentRoutes = router;
