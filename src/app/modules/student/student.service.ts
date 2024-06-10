import { UserModel } from './../user/user.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { StudentModel } from './student.model';
import httpStatus from 'http-status';
import { Student } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

// GET
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  //const queryObj = { ...query }; //searchTerm bad e sob thakbe

  //serach based on query
  //{ email: { $regex: query.searchTerm, $options: i } }
  //{ presentAddress: { $regex: query.searchTerm, $options: i } }

  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  //filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete queryObj[el]);
  // console.log({ query }, { queryObj });
  //  console.log({query,queryObj})

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  //sorting
  //   let sort = '-createdAt';
  //   if (query.sort) {
  //     sort = query.sort as string;
  //   }

  //   const sortQuery = filterQuery.sort(sort);

  //   //limit
  //   let page = 1;
  //   let limit = 1;
  //   let skip = 0;

  //   if (query.limit) {
  //     limit = Number(query.limit);
  //   }

  //   //pagination
  //   if (query.page) {
  //     page = Number(query.page);
  //     skip = (page - 1) * limit;
  //   }

  //   const paginateQuery = sortQuery.skip(skip);

  //   const limitQuery = paginateQuery.limit(limit);
  //   //Field filtering
  //   let fields = '-__v';
  //   if (query.fields) {
  //     fields = (query.fields as string).split(',').join(' ');
  //     console.log(fields);
  //   }

  //   const fieldQuery = await limitQuery.select(fields);

  //   return fieldQuery;

  const studentQuery = new QueryBuilder(StudentModel.find(), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  
  const result = await studentQuery.modelQuery;
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
      runValidators: true,
    }
  );
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
