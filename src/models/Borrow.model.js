import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    borrowedAt: { type: Date, default: Date.now },
    returnedAt: Date,
    status: {
      type: String,
      enum: ["BORROWED", "RETURNED"],
      default: "BORROWED"
    }
  }
);

export default mongoose.model("Borrow", borrowSchema);
