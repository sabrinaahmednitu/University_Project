import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    year: z.date(),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidattions = {
  createAcademicSemesterValidationSchema,
};
