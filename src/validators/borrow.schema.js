import { z } from "zod";

export const borrowBookSchema = z.object({
  bookId: z.string({
    required_error: "Book ID is missing"
  }).min(1)
});

export const returnBookSchema = z.object({
  borrowId: z.string({
    required_error: "Borrow ID is missing"
  }).min(1)
});
