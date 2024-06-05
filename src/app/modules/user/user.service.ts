import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
//1. POST
const createStudentIntoDB = async (password: string, payload: Student) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given use default password
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = 'student';

  //find academic semestter info
  const admissionSemester = await AcademicSemesterModel.findById(payload.admissionSemester)
  


  //transaction and callback
  //isolated environment start
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateStudentId(admissionSemester);

    //create a user(transaction-1) as array
    const newUser = await UserModel.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user')
    }
    ///set id , _id as user
    payload.id = newUser[0].id; //embedding id
    payload.user = newUser[0]._id; //ref _id
    //create a student(transaction-2) as array
    const newStudent = await StudentModel.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create new student')
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
}

export const UserServices = {
  createStudentIntoDB,
};
