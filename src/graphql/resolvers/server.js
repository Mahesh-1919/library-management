import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema/index.js";
import resolvers from "./graphql/resolvers/index.js";
import context from "./graphql/context.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

await server.start();
server.applyMiddleware({ app, path: "/graphql" });
