const fs = require("fs");

const schema = fs.readFileSync(__dirname + "/schema.graphql", "utf8");

module.exports = schema;
