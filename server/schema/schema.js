const graphql = require("graphql");
var _ = require("lodash");

// dummy data
let usersData = [
  { id: "1", name: "Bond", age: 36, profession: "Developer" },
  { id: "13", name: "Anna", age: 26, profession: "Architect" },
  { id: "211", name: "Bella", age: 16, profession: "Server" },
  { id: "19", name: "Gina", age: 46, profession: "Construction" },
  { id: "150", name: "Georgina", age: 56, profession: "Home maker" },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

// Create Types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        return _.find(usersData, { id: args.id });

        // we resolve with data
        // get and return data from a data source
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
