const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const path = __dirname + "/../../proto/proto.proto";

const { PRODUCTS_HOST, PRODUCTS_PORT } = process.env;

const defaultOpts = {
  host: PRODUCTS_HOST,
  port: PRODUCTS_PORT
};

class ProductService {
  constructor(opts = {}) {
    console.log("__dirname ", __dirname);
    // define options
    this.options = { ...defaultOpts, ...opts };

    // configure and initialize grpc client connection
    const packageDefinition = protoLoader.loadSync(path, {
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    const { proto } = protoDescriptor;
    this.client = new proto.ProductService(
      `${this.options.host}:${this.options.port}`,
      grpc.credentials.createInsecure()
    );
  }

  getProduct(sku) {
    if (sku === undefined) {
      return Promise.reject({
        data: null,
        error: { code: 400, message: "Sku can't be undefined" }
      });
    }
    return new Promise((resolve, reject) => {
      this.client.getProduct({ sku }, (err, data) =>
        err ? reject(err) : resolve(data)
      );
    });
  }

  listProducts() {
    return new Promise((resolve, reject) => {
      this.client.listProducts({}, (err, data) =>
        err ? reject(err) : resolve(data)
      );
    });
  }
}

module.exports = ProductService;
