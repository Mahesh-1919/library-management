import { gql } from "apollo-server-express";

export default gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    isbn: String
    publicationDate: String
    genre: String
    totalCopies: Int!
    availableCopies: Int!
  }

  extend type Query {
    books(
      page: Int
      limit: Int
      genre: String
      author: String
    ): [Book]
  }

  extend type Mutation {
    addBook(
      title: String!
      author: String!
      isbn: String
      publicationDate: String
      genre: String
      totalCopies: Int!
    ): Book
  }
`;
