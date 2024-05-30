import { AcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: AcademicSemester) => {
    const result = await AcademicSemesterModel.create(payload);
    return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};