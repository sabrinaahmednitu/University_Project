import express from 'express';
import validateRequest from '../../middlwares/validRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();
//1. create semester
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);
//2.getAll semester
router.get(
  '/get-academic-semester',
  AcademicSemesterControllers.getAllAcademicSemester
);
export const AcademicSemesterRoutes = router;
