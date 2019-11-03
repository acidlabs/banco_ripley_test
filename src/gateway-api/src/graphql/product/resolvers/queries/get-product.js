// GRPC Service
const ProductService = require("../../../../services/js/products-api");

const getProduct = async (_, { sku }) => {
  console.log(`[Product][GetProduct][Request] sku = ${JSON.stringify(sku)}`);
  const service = new ProductService();

  try {
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
