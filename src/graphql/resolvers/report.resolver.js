import Borrow from "../../models/Borrow.model.js";
import Book from "../../models/Book.model.js";

export default {
  Query: {
    mostBorrowedBooks: async (_, __, { user }) => {
      if (!user || user.role !== "ADMIN")
        throw new Error("Admin access required");

      return await Borrow.aggregate([
        { $group: { _id: "$bookId", borrowCount: { $sum: 1 } } },
        { $sort: { borrowCount: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "book"
          }
        },
        { $unwind: "$book" },
        {
          $project: {
            title: "$book.title",
            author: "$book.author",
            borrowCount: 1
          }
        }
      ]);
    },

    bookAvailability: async (_, __, { user }) => {
      if (!user || user.role !== "ADMIN")
        throw new Error("Admin access required");

      return await Book.aggregate([
        {
          $project: {
            title: 1,
            totalCopies: 1,
            availableCopies: 1,
            borrowedCopies: {
              $subtract: ["$totalCopies", "$availableCopies"]
            }
          }
        }
      ]);
    }
  }
};
