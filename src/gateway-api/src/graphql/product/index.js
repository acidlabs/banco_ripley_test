const schema = require("./schema");

const product = require("./resolvers/models/product");
const prices = require("./resolvers/models/prices");
const attribute = require("./resolvers/models/attribute");
const shipping = require("./resolvers/models/shipping");
const queries = require("./resolvers/queries");

const resolvers = {
  Product: product,
  Prices: prices,
  Attribute: attribute,
  Shipping: shipping,
  Query: queries
};

module.exports.schema = schema;
module.exports.resolvers = resolvers;
