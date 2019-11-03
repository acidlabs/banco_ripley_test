// GRPC Service
const ProductService = require("../../../../services/js/products-api");

const listProducts = async () => {
  console.log("[Product][ListProducts][Request] Empty");
  const service = new ProductService();

  try {
    const payload = await service.listProducts();
    console.log(
      `[Product][ListProducts][Response] payload = ${JSON.stringify(payload)}`
    );
    return payload;
  } catch (error) {
    console.error(
      `[Product][ListProducts][Error] error = ${JSON.stringify(error)}`
    );
    throw error;
  }
};

module.exports = listProducts;
