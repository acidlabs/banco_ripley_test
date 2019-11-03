// Node Modules
import React from "react";
import PropTypes from "prop-types";

const Card = ({ product, selectCard }) => (
  <div
    className="single_arrivel_item ripley_product"
    style={{
      border: "1px solid red",
      borderWidth: "1px",
      borderColor: "red",
      minHeight: "20rem",
      minWidth: "20rem",
      maxHeight: "20rem",
      maxWidth: "20rem"
    }}
    onClick={() => selectCard(product)}
  >
    <img src={product.fullImage} />
    <div className="hover_text">
      <h5>{product.name}</h5>
      <h5>{product.partNumber}</h5>
      <h5>{product.prices.formattedOfferPrice}</h5>
    </div>
  </div>
);

Card.propTypes = {
  product: PropTypes.object,
  selectCard: PropTypes.func
};

export default Card;
