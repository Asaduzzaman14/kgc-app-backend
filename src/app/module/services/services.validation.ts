import { z } from 'zod';

export const servicesValidationZodSchema = z.object({
  body: z.object({
    description: z.string().min(5, 'description must be at least 5 character'),
    addressDegree: z
      .string()
      .min(3, 'addressDegree must be at least 3 character'),
    servicesCatagory: z.string(),
  }),
});

export const serviceValidation = {
  servicesValidationZodSchema,
};
