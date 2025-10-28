import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(100),
  middleName: z.string().min(0).max(100).optional(),
  lastName: z.string().min(1).max(100),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: "Father's name should be in capitalized format",
      },
    ),
  fatherOccupation: z.string().min(1).max(100),
  fatherContactNo: z.string().min(1).max(15),
  motherName: z.string().min(1).max(100),
  motherOccupation: z.string().min(1).max(100),
  motherContactNo: z.string().min(1).max(15),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1).max(100),
  occupation: z.string().min(1).max(100),
  contactNo: z.string().min(1).max(15),
  address: z.string().min(1).max(255),
});

const studentValidationSchema = z.object({
  id: z.string().min(1).max(100),
  password: z.string().min(1).max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().min(1).max(20),
  email: z.string().min(1).max(255).email(),
  contactNo: z.string().min(1).max(15),
  emergencyContactNo: z.string().min(1).max(15),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1).max(255),
  permanentAddress: z.string().min(1).max(255),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().min(1).max(255).optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
