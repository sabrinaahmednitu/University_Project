import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
    timestamps:true,
});

// TAcademicFaculty model
export const AcademicFacultyModel = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema
);
