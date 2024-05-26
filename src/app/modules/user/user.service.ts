import config from '../../config';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
//1. POST
const createStudentIntoDB = async (password: string, studentData: Student) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given use default password
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = 'student';
  //manually generated id
  userData.id = '2030100001';

  //create a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    ///set id , _id as user
    studentData.id = newUser.id; //embedding id
    studentData.user = newUser._id; //ref _id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }

  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
