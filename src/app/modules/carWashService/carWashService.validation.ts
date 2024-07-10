import {  z } from "zod";


export const carWashServiceValidationSchema = z.object({
    body: z.object({
        name: z.string({invalid_type_error:'name is required!'}),
        description: z.string({invalid_type_error:'Description is required!'}),
        price: z.number({invalid_type_error:'price is required!'}),
        duration: z.number({invalid_type_error:'duration is required!'}),
        isDeleted: z.boolean().default(false),
      })
})