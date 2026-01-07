import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      role: String
    ): User

    login(email: String!, password: String!): AuthResponse
  }
`;
