// dependencies
const { makeExecutableSchema } = require("graphql-tools");

// Schemas and resolvers
const {
  schema: productSchema,
  resolvers: productResolvers
} = require("./product");

const typeDefs = [productSchema];

const resolvers = [productResolvers];

const resolverValidationOptions = {
  // After we fix all errors that this prints, we should probably go
  // back to `true` (the default)
  requireResolversForResolveType: false
};

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
  resolverValidationOptions
});

module.exports = schema;
