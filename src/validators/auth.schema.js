import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include upper, lower, number & symbol"
    ),
  role: z.enum(["ADMIN", "MEMBER"]).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});
