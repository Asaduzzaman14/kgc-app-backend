import { z } from 'zod';

const catagoryValidationZodSchema = z.object({
  data: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
  }),
});

const updateCatagoryValidationZodSchema = z.object({
  data: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional(),
    serialNo: z.number().optional(),
  }),
});

export const catagoryValidation = {
  catagoryValidationZodSchema,
  updateCatagoryValidationZodSchema,
};
