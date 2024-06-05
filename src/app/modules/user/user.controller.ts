
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

//1. POST controller
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  
  const result = await UserServices.createStudentIntoDB(password, studentData);
  //zod validation end

  //send post response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
