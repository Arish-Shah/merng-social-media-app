import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

import schema from "./graphql/index.js";

const main = async () => {
  dotenv.config();

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const port = process.env.PORT || 4000;

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      secret: process.env.SESSION_SECRET,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: process.env.DB_NAME,
        collectionName: "sessions",
      }),
      cookie: {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60,
        secure: false,
        path: "/",
      },
      resave: false,
      saveUninitialized: false,
    })
  );

  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}/graphql`);
  });
};

main().catch(console.error);
