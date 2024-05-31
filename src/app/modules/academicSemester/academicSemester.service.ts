import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

//1. create semester
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


//2. get Allsemester
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
}

//3.get single semester by id
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findOne({ id: id });
  return result;
}; 

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
};
