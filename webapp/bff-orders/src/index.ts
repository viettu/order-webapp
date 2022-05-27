import { ApolloServer } from 'apollo-server-express';
import dataSources from './data-sources';
import express from 'express';
import typeDefs from './schema';
import resolvers from './resolvers';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

const PORT = 3200;
apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });
  
  app.listen(PORT, () => {
    console.log(
      `GraphQL is listening on port ${PORT}`,
    );
  });
});
