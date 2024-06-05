import { UserModel } from './../user/user.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { StudentModel } from './student.model';
import httpStatus from 'http-status';
import { Student } from './student.interface';

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
  const result = await StudentModel.findOne({ id: id })
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
const updateStudentFromDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);
  const result = await StudentModel.findOneAndUpdate(
    { id: id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators:true,
    });
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
    throw new Error('Faild to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
