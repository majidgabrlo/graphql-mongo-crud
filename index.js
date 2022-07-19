const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const MONGODB =
  "mongodb+srv://majid:fuchs333@cluster0.4h3m3.mongodb.net/?retryWrites=true&w=majority";

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(MONGODB).then(() => {
  server.listen().then(({url}) => {
    console.log("listining to " + url);
  });
});
