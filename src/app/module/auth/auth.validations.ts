import { z } from 'zod';

const authValidationZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),

    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email address'),

    name: z.string({
      required_error: 'Name is required',
    }),

    phone: z.string({
      required_error: 'Phone is required',
    }),

    lastDonateDate: z.string().optional(),

    upazila: z.string({
      required_error: 'Upazila is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required',
    }),
  }),
});

export const AuthValidation = {
  authValidationZodSchema,
  refreshTokenZodSchema,
};
