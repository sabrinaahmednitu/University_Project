
 export type Months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type AcademicSemesterName = 'Autumn' | 'Summer' | 'Fail';
export type AcademicSemesterCode = '01' | '02' | '03';


export type AcademicSemester = {
  name: AcademicSemesterName;
  code: AcademicSemesterCode;
  year: string;
  startMonth: Months;
  endMonth: Months;
};
