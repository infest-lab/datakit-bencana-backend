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

function validateApiKey(apikey: any){
	if(config.registeredApiKeys.indexOf(apikey) !== -1) return true;
	return false;
}

const server = new ApolloServer({
  schema,
  cors: true,
  context: ({req}:any={}) => {
  	//console.log(req)
  	if(typeof req !== 'undefined' && typeof req.headers !== 'undefined'){
  		if(typeof req.headers['x-datakit-api-key'] !== 'undefined'){
  			if(validateApiKey(req.headers['x-datakit-api-key'])){
  				//console.log('authorized')
	        	return {
	        		authorized: true
	        	}
	        }
  		}
  		throw new Error('Forbidden Access. It needs valid api key for authentication');
  	}
  },
  subscriptions: {
    onConnect: (connectionParams:any, webSocket, context) => {
    	//console.log(webSocket)
		if (typeof connectionParams['x-datakit-api-key'] !== 'undefined') {
			if(validateApiKey(connectionParams['x-datakit-api-key'])){
				return {
					authorized: true
				}
			}         
		}
		throw new Error('Forbidden Access. It needs valid api key for authentication');
    },
  },
});

server.listen({
  port: config.port
}).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});