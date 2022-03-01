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

let hobbiesData = [
  {
    id: "1",
    title: "Programming",
    description: "Using computers to make the world a better place",
  },
  {
    id: "2",
    title: "Rowing",
    description: "Sweat and feel better before eating donuts",
    userId: "1",
  },
  {
    id: "3",
    title: "Swimming",
    description: "Get in the water and learn to become the water",
    userId: "13",
  },
  {
    id: "4",
    title: "Fencing",
    description: "A hobby for fency people",
    userId: "19",
  },
  {
    id: "5",
    title: "Hiking",
    description: "Wear hiking boots and explore the world",
    userId: "150",
  },
];

let postsData = [
  { id: "1", comment: "Building a Mind", userId: "1" },
  { id: "2", comment: "GraphQL is amazing", userId: "1" },
  { id: "3", comment: "How to change the world", userId: "1" },
  { id: "4", comment: "How to change the world2", userId: "19" },
  { id: "5", comment: "How to change the world3", userId: "211" },
  { id: "6", comment: "How to change the world4", userId: "211" },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;

// Create Types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });
      },
    },

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
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

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        // return data for our hobby
        return _.find(hobbiesData, { id: args.id });
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        // return post data
        return _.find(postsData, { id: args.id });
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        //id: { type: GraphQLID }
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },

      resolve(parent, args) {
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession,
        };
        return user;
      },
    },
    createPost: {
      type: PostType,
      args: {
        //id: { type: GraphQLID }
        comment: { type: GraphQLString },
      },

      resolve(parent, args) {
        let post = {
          comment: args.comment,
        };
        return post;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
