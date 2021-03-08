const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const { readToken } = require("./utils/token");

const main = async () => {
  dotenv.config();

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "").trim();
      const userID = readToken(token);

      return {
        req,
        res,
        userID,
      };
    },
  });

  const { url } = await server.listen(process.env.PORT);
  console.log(`🚀 Server started on ${url}`);
};

main().catch(console.error);
