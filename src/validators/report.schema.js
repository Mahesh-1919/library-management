import { z } from "zod";

export const reportQuerySchema = z.object({
  limit: z
    .string()
    .transform(Number)
    .optional()
});
