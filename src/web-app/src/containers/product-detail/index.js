// Node Modules
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import getProductAction from "../../redux/modules/get-product";

// Components
import ProductDetail from "../../components/product-detail";
import Navbar from "../navbar";

class ProductDetailPage extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    return this.props.getProduct(id);
  }
  render() {
    const { product: data, history } = this.props;
    return (
      <Fragment>
        <Navbar history={history} />
        <ProductDetail product={data.product} />
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
      getProduct: getProductAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailPage);
