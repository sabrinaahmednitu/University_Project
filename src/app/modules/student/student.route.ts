import { StudentControllers } from "./student.controller";
import express from "express";
import validateRequest from "../../middlwares/validRequest";
import { studentValidations, UpdateStudentValidationSchema } from "./student.validation";

const router = express.Router();

//will call controller function
//GET all data
router.get('/', StudentControllers.getAllStudents);
//GET single student data by ID
router.get('/:id', StudentControllers.getSingleStudent);
//update student
router.patch('/:id',
    validateRequest(studentValidations.UpdateStudentValidationSchema),
    StudentControllers.updateStudent);
//delete student
router.delete('/:id', StudentControllers.deleteStudent);
export const StudentRoutes = router;
