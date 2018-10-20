/*import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';*/
import {
	addMockFunctionsToSchema,
	gql,
	makeExecutableSchema
} from "apollo-server";
import { GraphQLSchema } from "graphql";
import resolvers from './resolvers';

const typeDefs = `
scalar Date
type Category{
	name: String
	pointCount: Int
}
type Point{
	id: ID
	name: String
	description: String
	category: String
	address: String
	latitude: Float
	longitude: Float
	survivors: Int
	contact: String
	phone: String
	notes: String
	createdAt: Date
	modifiedAt: Date
	verified: Boolean
	verifiedBy: User
	demands: [Demand]
	supplies: [Supply]
	demographies: [Demography]
	activities: [Activity]
	lastDemography: Demography
}

input PointInput{
	name: String
	description: String
	category: String
	address: String
	latitude: Float
	longitude: Float
	survivors: Int
	contact: String
	phone: String
	notes: String
}

type Demand{
	id: ID
	name: String
	qty: Float
	unit: String
	user: User
	createdAt: Date
	modifiedAt: Date
	verified: Boolean
	verifiedBy: User
	closed: Boolean
	closedBy: User
}

input DemandInput{
	name: String
	qty: Float
	unit: String
	point: ID
	user: ID
}

type Supply{
	id: ID
	name: String
	qty: Float
	unit: String
	user: User
	createdAt: Date
	modifiedAt: Date
	verified: Boolean
	verifiedBy: User
}

input SupplyInput{
	name: String
	qty: Float
	unit: String
	point: ID
	user: ID
}

type Demography{
	id: ID	
	male: Int
	female: Int
	difable: Int
	children: Int
	lansia: Int
	adult: Int
	user: User
	createdAt: Date
	modifiedAt: Date
	verified: Boolean
	verifiedBy: User
}

input DemographyInput{
	male: Int
	female: Int
	difable: Int
	children: Int
	lansia: Int
	adult: Int
	point: ID
	user: ID
}

type Activity{
	id: ID
	name: String	
	description: String
	date: Date
	user: User
	createdAt: Date
	modifiedAt: Date
	verified: Boolean
	verifiedBy: User
}

input ActivityInput{
	name: String	
	description: String
	date: Date
	point: ID
	user: ID
}

type User{
	id: ID
	name: String
	email: String
	phone: String
	profile: UserProfile
	createdAt: Date
	modifiedAt: Date
	verified: Boolean
}

type UserProfile{
	gender: String
	nickname: String
	picture: String
	sub: String
	updated_at: Date
}

input UserProfileInput{
	gender: String
	nickname: String
	picture: String
	sub: String
	updated_at: Date
}

input UserInput{
	name: String
	email: String
	profile: UserProfileInput
}

type Statistik{
	pointsCount: Int
	demandsCount: Int
	suppliesCount: Int
	activitiesCount: Int
}

type Query{
	point(id: ID!) : Point
	points(limit: Int, skip: Int, orderBy: String, asc: Boolean) : [Point]
	#searchPoints(args: SearchFields) : [Point]
	search(q: String!): [Point]
	pointsByCategory(category: String!): [Point]
	pointCategory(): [Category]
	getUser(email: String!): User
	getUsers(limit: Int, skip: Int, orderBy: String, asc: Boolean): [User]
	demands(pointId: ID!): [Demand]
	supplies(pointId: ID!): [Supply]
	activities(pointId: ID!): [Activity]
	lastDemography(pointId: ID!): Demography
	statistik(): Statistik
}
type Mutation{
	createPoint(input: PointInput!): Point
	updatePoint(id: ID!, input: PointInput!): Boolean
	deletePoint(id: ID!): Boolean

	#Demand	
	addDemand(input:DemandInput!): Demand
	verifyDemand(id:ID!, user:ID!): Demand
	closeDemand(id:ID!, user:ID!): Demand

	#Supply
	addSupply(input: SupplyInput!): Supply
	verifySupply(id:ID!, user:ID!): Supply

	#Activity
	addActivity(input: ActivityInput!): Activity
	verifyActivity(id:ID!, user:ID!): Activity

	#Demography
	addDemography(input: DemographyInput!): Demography
	verifyDemography(id:ID!, user:ID!): Demography

	#User
	createUser(input: UserInput!): User
	verifyUser(id:ID!): Boolean

}
type Subscription {
	demandAdded: Demand
	supplyAdded: Supply
	activityAdded: Activity
	demographyAdded: Demography
}
# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

//const schemas: GraphQLSchema = makeExecutableSchema({typeDefs});
//addMockFunctionsToSchema({ schema: schemas });
//[dateType, pointType, pointInput, demandType, demandInput, supplyType, supplyInput, demographyType, demographyInput, activityType, userType, userProfileType, userProfileInput, userInput, Queries, Mutations, Subscription]

/*const schemas: GraphQLSchema = makeExecutableSchema({
	typeDefs: [dateType, pointType, pointInput, demandType, demandInput, supplyType, supplyInput, demographyType, demographyInput, activityType, activityInput, userType, userProfileType, userProfileInput, userInput, Queries, Mutations, Subscription],
	resolvers
});
addMockFunctionsToSchema({ schema: schemas });
export default [schemas];*/

const schemas = makeExecutableSchema({ typeDefs, resolvers });
export default schemas;


