import { PubSub, ApolloServer } from 'apollo-server';
import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";

import mongoose = require('mongoose');
import schemas from "./data/schemas";
import resolvers from "./data/resolvers";
import config from './config/config';

import Bluebird = require("bluebird");
(<any>mongoose).Promise = Bluebird;

// connect to mongo db
mongoose.connect(config.db.mongoUri, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db.mongoUri}`);
});

const schema: GraphQLSchema = schemas;

export const pubsub = new PubSub();

const server = new ApolloServer({
  schema,
});

server.listen({
  port: config.port
}).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});