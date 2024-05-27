import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';


//2. GET controller
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  //send get response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

//3. GET single student by ID
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  //send single get response bt ID
  //send post response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student is retrieved successfully',
    data: result,
  });
});

//4. DeleteStudent
// const deleteStudent = catchAsync(async (req, res) => {
//   const { studentId } = req.params;
//   const result = await StudentServices.deleteStudentFromDB(studentId);
//   res.status(200).json({
//     success: true,
//     message: 'student is deleted successfully',
//     data: result,
//   });
// });

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
};
