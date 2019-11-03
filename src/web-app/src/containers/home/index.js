// Node Modules
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import fetchProductsAction from "../../redux/modules/fetch-products";

// Components
import Home from "../../components/home";
import Navbar from "../navbar";

class HomePage extends Component {
  async componentDidMount() {
    const { history, auth } = this.props;
    const { token } = auth;
    if (token === null || token === undefined) {
      history.push("/login");
    }

    return this.props.fetchProducts();
  }

  selectCard = card => {
    const { history } = this.props;
    history.push(`/product/${card.partNumber}`);
  };

  render() {
    const { products: data, history } = this.props;
    return (
      <Fragment>
        <Navbar history={history} />
        <div className="countainer-fluid">
          <Home products={data.products} selectCard={this.selectCard} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts: fetchProductsAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
