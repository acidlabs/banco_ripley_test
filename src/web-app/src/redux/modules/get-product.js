import axios from "axios";
import {
  getProductPending,
  getProductSuccess,
  getProductError
} from "../actions";

function getProduct(sku) {
  return dispatch => {
    dispatch(getProductPending());
    const query = `
      query GetProduct($sku: String!){
        getProduct(sku: $sku) {
            data{
            uniqueId
            partNumber
            name
            fullImage
            images
            prices {
                listPrice
                offerPrice
                discount
                discountPercentage
                ripleyPuntos
                formattedListPrice
                formattedOfferPrice
                formattedDiscount
            }
            longDescription
            attributes {
                displayable
                id
                identifier
                name
                usage
                value
            }
            shipping {
                rTienda
                dDomicilio
                rCercano
                cashOnDelivery
            }
            thumbnailImage
            }
         }
        }
      `;

    const variables = {
      sku
    };
    axios
      .post("/graphql", { query, variables })
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        const { getProduct } = res.data.data;
        dispatch(getProductSuccess(getProduct.data));
        return getProduct.data;
      })
      .catch(error => {
        dispatch(getProductError(error));
      });
  };
}

export default getProduct;
