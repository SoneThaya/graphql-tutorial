const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;

// Create Types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});
