
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




export type AcademicSemester = {
  name: 'Autumn' | 'Summer' | 'Fail';
  code: '01' | '02' | '03';
  year: Date;
  startMonth: Months;
  endMonth: Months;
};
