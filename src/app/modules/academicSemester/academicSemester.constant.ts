import { AcademicSemesterCode, AcademicSemesterName, Months, TAcademicSemesterNameCodeMapper } from "./academicSemester.interface";

export const months: Months[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterName: AcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fail',
];
export const academicSemesterCode: AcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
  