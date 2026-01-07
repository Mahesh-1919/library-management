import Book from "../../models/Book.model.js";

export default {
  Query: {
    books: async (_, args) => {
      const { page = 1, limit = 10, genre, author } = args;
      const filter = {};
      if (genre) filter.genre = genre;
      if (author) filter.author = author;

      return await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);
    }
  },

  Mutation: {
    addBook: async (_, args, { user }) => {
      if (!user || user.role !== "ADMIN")
        throw new Error("Admin access required");

      return await Book.create({
        ...args,
        availableCopies: args.totalCopies
      });
    }
  }
};
