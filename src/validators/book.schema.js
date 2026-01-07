import { z } from "zod";

export const addBookSchema = z.object({
  title: z.string({ required_error: "Title is missing" }).min(1),
  author: z.string({ required_error: "Author is missing" }).min(1),
  isbn: z.string().optional(),
  publicationDate: z.string().optional(),
  genre: z.string().optional(),

  totalCopies: z.number({
    required_error: "Total copies is missing"
  }).int().positive("Total copies must be > 0")
});

export const updateBookSchema = addBookSchema.partial();
