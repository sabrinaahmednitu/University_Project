import { string } from 'joi';
import { model, Schema } from 'mongoose';
import { AcademicSemester, Months } from './academicSemester.interface';

const months: Months[] = [
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

const academicSemesterSchema = new Schema<AcademicSemester>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
    },
    endMonth: {
      type: String,
      enum: months,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
export const AcademicSemesterModel = model<AcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);
