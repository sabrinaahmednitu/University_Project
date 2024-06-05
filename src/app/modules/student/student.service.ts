import { UserModel } from './../user/user.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { StudentModel } from './student.model';
import httpStatus from 'http-status';

// GET
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id:id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
// update single student
const updateStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id:id })
  return result;
};

//delete student
const deleteStudentFromDB = async (id: string) => {
  //isolated environment
  const session = await mongoose.startSession();
  try {
    //start transaction
    session.startTransaction();

    //transaction-1
    const result = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete student');
    }

    //transaction-2
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,updateStudentFromDB,
  deleteStudentFromDB,
};
