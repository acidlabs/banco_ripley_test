// Node Modules
import React from "react";
import PropTypes from "prop-types";

// Style
import "./styles.scss";

// Components
import Card from "./card";

const Home = ({ products, selectCard }) => (
  <section className="new_arrival section_padding">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <div className="arrival_tittle">
            <h2>PRODUCTOS</h2>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="arrival_filter_item filters"></div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="new_arrival_iner filter-container">
            {products.map(product => (
              <Card
                product={product}
                selectCard={selectCard}
                key={product.uniqueId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

Home.propTypes = {
  products: PropTypes.array,
  selectCard: PropTypes.func
};

export default Home;
