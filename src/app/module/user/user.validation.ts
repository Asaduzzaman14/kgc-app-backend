import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    bloodGroup: z.string({
      required_error: 'Blood group is required',
    }),

    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),

    profileImage: z.string().optional(),
  }),
});

const updateProfileSchema = z
  .object({
    body: z.object({
      email: z
        .string()
        .min(4, { message: 'Email must be at least 4 characters long' })
        .optional(),
      name: z
        .string()
        .min(4, { message: 'Name must be at least 4 characters long' })
        .optional(),
      phone: z
        .string()
        .min(10, {
          message: 'Phone number must be at least 10 characters long',
        })
        .max(15, { message: 'Phone number too long' })
        .optional(),
      lastDonateDate: z.string().optional(),
      upazila: z
        .string()
        .min(4, { message: 'Upazila must be at least 3 characters long' })
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          message: 'Invalid blood group',
        })
        .optional(),
    }),
  })
  .partial();

export const UserValidation = {
  updateProfileSchema,
  createAdminZodSchema,
};
