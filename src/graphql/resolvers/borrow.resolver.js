import Borrow from "../../models/Borrow.model.js";
import Book from "../../models/Book.model.js";

export default {
  Query: {
    myBorrowHistory: async (_, __, { user }) => {
      if (!user) throw new Error("Unauthorized");

      return await Borrow.find({ userId: user.id })
        .populate("bookId");
    }
  },

  Mutation: {
    borrowBook: async (_, { bookId }, { user }) => {
      if (!user) throw new Error("Unauthorized");

      const book = await Book.findById(bookId);
      if (!book || book.availableCopies <= 0)
        throw new Error("Book unavailable");

      book.availableCopies--;
      await book.save();

      return await Borrow.create({
        userId: user.id,
        bookId
      });
    },

    returnBook: async (_, { borrowId }, { user }) => {
      if (!user) throw new Error("Unauthorized");

      const borrow = await Borrow.findById(borrowId);
      if (!borrow) throw new Error("Record not found");

      borrow.status = "RETURNED";
      borrow.returnedAt = new Date();
      await borrow.save();

      const book = await Book.findById(borrow.bookId);
      book.availableCopies++;
      await book.save();

      return "Book returned successfully";
    }
  }
};
