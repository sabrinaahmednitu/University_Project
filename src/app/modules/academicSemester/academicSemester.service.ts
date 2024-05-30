import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: AcademicSemester) => {
  //semester name------>semester code
  // type TAcademicSemesterNameCodeMapper = {
  //   [key: string]: string;
  // }

  // const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  //   Autumn: '01',
  //   Summer: '02',
  //   Fall: '03',
  // };

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
