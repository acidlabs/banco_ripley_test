import axios from "axios";
import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError
} from "../actions";

function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsPending());
    const query = `
      {
        listProducts {
          data {
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
    axios
      .post("/graphql", { query })
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        const { listProducts } = res.data.data;
        dispatch(fetchProductsSuccess(listProducts.data));
        return listProducts.data;
      })
      .catch(error => {
        dispatch(fetchProductsError(error));
      });
  };
}

export default fetchProducts;
