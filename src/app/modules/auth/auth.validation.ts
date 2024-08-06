import { z } from "zod";



export const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'email or username is required' }).email({message:'invalid email type'})
      ,
    password: z.string({ required_error: 'Password is required!' })
  })
});
