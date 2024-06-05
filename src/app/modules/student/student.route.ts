import { StudentControllers } from "./student.controller";
import express from "express";

const router = express.Router();

//will call controller function
//GET all data
router.get('/', StudentControllers.getAllStudents);
//GET single student data by ID
router.get('/:studentId', StudentControllers.getSingleStudent);
//update student
router.patch('/:studentId',StudentControllers.updateStudent);
//delete student
router.delete('/:studentId', StudentControllers.deleteStudent);
export const StudentRoutes = router;
