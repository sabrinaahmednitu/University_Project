import { z } from 'zod';

const userValidationSchema = z.object({
  //id: z.string(), //bd theke asbe
    password: z.string({
      invalid_type_error:'password must be string'
  })
    .max(20, { message: 'password can not be more than 20 character' })
    .optional(),
  //needsPasswordChange: z.boolean().optional().default(true),  
  //role: z.enum(['student', 'faculty', 'admin']),
  //status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  //isDelete: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
