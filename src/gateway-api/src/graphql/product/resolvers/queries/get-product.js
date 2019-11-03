// GRPC Service
const ProductService = require("../../../../services/js/products-api");

const randomNumber = () => Math.floor(Math.random() * 100);

const getProduct = async (_, { sku }) => {
  console.log(`[Product][GetProduct][Request] sku = ${JSON.stringify(sku)}`);
  const service = new ProductService();

  try {
    let random = 0;

    while (random < 15) {
      console.log(
        `[Product][GetProduct][Error] you have bad luck. retrying...`
      );
      random = randomNumber();
    }

    const payload = await service.getProduct(sku);

    console.log(
      `[Product][GetProduct][Response] payload = ${JSON.stringify(payload)}`
    );
    return payload;
  } catch (error) {
    console.error(
      `[Product][GetProduct][Error] error = ${JSON.stringify(error)}`
    );
    throw error;
  }
};

module.exports = getProduct;
