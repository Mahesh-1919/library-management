import Book from "../models/Book.model.js";

//add book
export const addBook = async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      availableCopies: req.body.totalCopies
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to add book", error });
  }
};

export const getBooks = async (req, res) => {
  const { page = 1, limit = 10, genre, author } = req.query;

  const filter = {};
  if (genre) filter.genre = genre;
  if (author) filter.author = author;

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(books);
};


export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (req.body.totalCopies !== undefined) {
      const borrowedCopies =
        book.totalCopies - book.availableCopies;

      if (req.body.totalCopies < borrowedCopies) {
        return res.status(400).json({
          message: "Total copies cannot be less than borrowed copies"
        });
      }

      book.availableCopies =
        req.body.totalCopies - borrowedCopies;
    }

    Object.assign(book, req.body);
    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error });
  }
};
