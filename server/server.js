// require dotenv
require("dotenv").config();
// require express
const express = require("express");
// require apollo server
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// require path
const path = require("path");

// require in auth middle ware
const { authMiddleware } = require("./utils/auth");

// require in typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

// require in connection to db
const db = require("./config/connection");

// Setting up PORT - use PORT from .env or 3001
const PORT = process.env.PORT || 3001;
// setting express = app
const app = express();

// setting server to use ApolloServer -
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

startStandaloneServer(server, {
  // context: ({ req }) => {
  //   async () => ({
  //     auth: authMiddleware,
  //   });
  //   return {
  //     token: req.headers?.token,
  //   };
  // },
  context: ({ req, res }) => {
    async () => ({
      // db: await client.connect(db),
      token: await getTokenForRequest(req),
    });
    // authScope: getScope(req.headers.authorization),
  },
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`API server running on port http://localhost:${PORT}!`);
  console.log(`Use GraphQL at ${url}`);
});
