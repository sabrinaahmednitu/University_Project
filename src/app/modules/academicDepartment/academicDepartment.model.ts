import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref:'AcademicFaculty'
    }
  },
  {
    timestamps: true,
  }
);

//department name duplicate hobena
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new Error('This department is already esists!');
  }
  next();
})

//query middleware diye delete id update howa atkaschi 
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
 const isDepartmentExists = await AcademicDepartmentModel.findOne(query);
   if (!isDepartmentExists) {
     throw new Error('This department does not esists!');
   }
   next();
});

//model
export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
