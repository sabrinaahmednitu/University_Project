import { AcademicSemester } from '../academicSemester/academicSemester.interface';

// generated id
export const generateStudentId = (payload: AcademicSemester) => {
  const currentId = (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4,'0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
