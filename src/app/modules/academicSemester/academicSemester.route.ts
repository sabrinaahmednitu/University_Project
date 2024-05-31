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
//2. getAll semester
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
//3. get single semester by id
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester
);
//4. (findOneAndUpdate) update single semester by id
router.patch(
  '/:semesterId',
  AcademicSemesterControllers.updateAcademicSemester
);
export const AcademicSemesterRoutes = router;
