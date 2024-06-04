import { AcademicFacultyControllers } from './../academicFaculty/academicFaculty.controller';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import express from 'express';
import validateRequest from '../../middlwares/validRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);


export const AcademicDepartmentRoutes = router;