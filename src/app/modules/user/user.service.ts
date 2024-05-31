import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.interface';
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
  const admissionSemester=await AcademicSemesterModel.findById(payload.admissionSemester)

  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    ///set id , _id as user
    payload.id = newUser.id; //embedding id
    payload.user = newUser._id; //ref _id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }

  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
