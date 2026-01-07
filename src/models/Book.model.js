import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    isbn: String,
    publicationDate: Date,
    genre: String,
    totalCopies: Number,
    availableCopies: Number
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
