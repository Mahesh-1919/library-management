import Borrow from "../models/Borrow.model.js";
import Book from "../models/Book.model.js";
import User from "../models/User.model.js";

/**
 * Most Borrowed Books
 */
export const mostBorrowedBooks = async (req, res) => {
  const report = await Borrow.aggregate([
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
        _id: 0,
        title: "$book.title",
        author: "$book.author",
        borrowCount: 1
      }
    }
  ]);

  res.json(report);
};

/**
 * Most Active Members
 */
export const activeMembers = async (req, res) => {
  const report = await Borrow.aggregate([
    { $group: { _id: "$userId", totalBorrows: { $sum: 1 } } },
    { $sort: { totalBorrows: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        name: "$user.name",
        email: "$user.email",
        totalBorrows: 1
      }
    }
  ]);

  res.json(report);
};

/**
 * Book Availability Summary
 */
export const bookAvailability = async (req, res) => {
  const report = await Book.aggregate([
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

  res.json(report);
};
