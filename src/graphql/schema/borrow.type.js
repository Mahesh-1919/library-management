import { gql } from "apollo-server-express";

export default gql`
  type Borrow {
    id: ID!
    book: Book!
    borrowedAt: String!
    returnedAt: String
    status: String!
  }

  extend type Query {
    myBorrowHistory: [Borrow]
  }

  extend type Mutation {
    borrowBook(bookId: ID!): Borrow
    returnBook(borrowId: ID!): String
  }
`;
