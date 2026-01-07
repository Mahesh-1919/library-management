import { gql } from "apollo-server-express";
import userType from "./user.type.js";
import bookType from "./book.type.js";
import borrowType from "./borrow.type.js";
import reportType from "./report.type.js";

const baseType = gql`
  type Query
  type Mutation
`;

export default [
  baseType,
  userType,
  bookType,
  borrowType,
  reportType
];
