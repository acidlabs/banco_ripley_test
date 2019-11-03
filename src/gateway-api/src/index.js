//load env values
require("dotenv").config();

//load dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const expressGraphQL = require("express-graphql");
const schema = require("./graphql");

// load api routes
const api = require("./api");

// initialize express
const app = express();

// define port
const port = process.env.PORT || 4000;

// define morgan for show logs
app.use(morgan(":method :url :status :response-time ms"));

// configure bodyparser and cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// set api routes for api
app.use("/api/v1", api);

// graphql middleware
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split("\n") : [],
      path: error.path
    }),
    pretty: true
  })
);

// listen server
const server = app.listen(port, () =>
  console.log(`Gateway backend is running on port ${port}`)
);

// event listener for graceful shutdown
process.on("SIGTERM", () => {
  server.close(err => {
    if (err) {
      console.log("here in server.close", err);
      process.exit(1);
    }

    process.exit(0);
  });
});

// export server
module.exports = server;
