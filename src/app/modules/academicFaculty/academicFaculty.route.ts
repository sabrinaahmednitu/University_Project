import { AcademicFacultyControllers } from './academicFaculty.controller';
import express from 'express';
import validateRequest from '../../middlwares/validRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();
router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createacademicFaculty
);


router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculties);

router.patch('/:facultyId',validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),AcademicFacultyControllers.updateAcademicFaculty)

export const AcademicFacultyRoutes = router;