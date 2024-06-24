import { z } from 'zod';

export const servicesValidationZodSchema = z.object({
  body: z.object({
    description: z
      .string()
      .min(5, 'description must be at least 5 character')
      .max(255),
    phone: z.string().min(9, 'phone must be at least 10 character').max(20),
    location: z
      .string()
      .min(3, 'location must be at least 3 character')
      .max(255),
    servicesCatagory: z.string(),
  }),
});

export const serviceValidation = {
  servicesValidationZodSchema,
};
