import { StudentModel } from "./student.model";
import { Student } from "./student.interface";

//1. POST
// const createStudentIntoDB = async (student: Student) => {
//   const result = await StudentModel.create(student);
//   return result;
// };

//2. GET
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

//3. get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

//delete student 
// const deleteStudentFromDB=

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
