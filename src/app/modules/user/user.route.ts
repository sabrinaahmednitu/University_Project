import express from 'express';
import validateRequest from '../../middlwares/validRequest';
import { CreateStudentValidationSchema } from '../student/student.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(CreateStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;
