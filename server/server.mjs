import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import dotenv from "dotenv";
dotenv.config();

// // require in auth middle ware
import authMiddleware from "./utils/auth.js";

import typeDefs from "./schemas/typeDefs.js";
import resolvers from "./schemas/resolvers.js";

// require in connection to db
import db from "./config/connection.js";

// Setting up PORT - use PORT from .env or 3001
const PORT = process.env.PORT || 3001;

// setting server to use ApolloServer -
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apollo standalone server instance
const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    req;
  },
  listen: { port: PORT },
});
console.log(`🚀 Server ready at ${url}`);
