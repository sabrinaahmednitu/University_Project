import { model, Schema } from 'mongoose';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<AcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: academicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
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
