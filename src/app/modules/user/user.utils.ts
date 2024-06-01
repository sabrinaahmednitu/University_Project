import { UserModel } from './user.model';

//student id =  year+code+4 digit number

import { AcademicSemester } from '../academicSemester/academicSemester.interface';

//find last student
const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1, //field filtering
      _id: 0, //default ta lagbena tai 0 kore dechi
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
// generated id
export const generateStudentId = async (payload: AcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  if (lastStudentId) {
    ///2030 01 0001
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // 01
    const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;
    if (
      lastStudentId &&
      lastStudentSemesterCode === currentSemesterCode &&
      lastStudentYear === currentYear
    ) {
      currentId = lastStudentId.substring(6); //0000
    }
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
