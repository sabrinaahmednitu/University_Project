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

// 2030 e jate fall semester 2 bar create na hoy
//mongoose er (next)
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    //this er modde user er dawa data ta k pabo
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new Error('Semester is already esists !');
  }
  next();
});

// 3. Create a Model.
export const AcademicSemesterModel = model<AcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);
