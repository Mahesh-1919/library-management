import { gql } from "apollo-server-express";

export default gql`
  type MostBorrowedBook {
    title: String!
    author: String!
    borrowCount: Int!
  }

  type ActiveMember {
    name: String!
    email: String!
    totalBorrows: Int!
  }

  type BookAvailability {
    title: String!
    totalCopies: Int!
    availableCopies: Int!
    borrowedCopies: Int!
  }

  extend type Query {
    mostBorrowedBooks: [MostBorrowedBook]
    activeMembers: [ActiveMember]
    bookAvailability: [BookAvailability]
  }
`;
