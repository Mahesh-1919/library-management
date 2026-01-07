import Borrow from "../models/Borrow.model.js";
import Book from "../models/Book.model.js";

export const borrowBook = async (req, res) => {
  const book = await Book.findById(req.params.bookId);

  if (!book || book.availableCopies <= 0)
    return res.status(400).json({ message: "Book unavailable" });

  book.availableCopies--;
  await book.save();

  const borrow = await Borrow.create({
    userId: req.user.id,
    bookId: book._id
  });

  res.status(201).json(borrow);
};

export const returnBook = async (req, res) => {
  const borrow = await Borrow.findById(req.params.borrowId);
  if (!borrow)
    return res.status(404).json({ message: "Borrow record not found" });

  borrow.status = "RETURNED";
  borrow.returnedAt = new Date();
  await borrow.save();

  const book = await Book.findById(borrow.bookId);
  book.availableCopies++;
  await book.save();

  res.json({ message: "Book returned successfully" });
};
