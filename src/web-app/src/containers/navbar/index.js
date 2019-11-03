// Node Modules
import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { DELETE_TOKEN } from "../../redux/actions";

// Components
import Navbar from "../../components/navbar";

class NavbarContainer extends Component {
  logout = async () => {
    const { dispatch, history } = this.props;
    await dispatch({ type: DELETE_TOKEN });

    return history.push("/login");
  };
  render() {
    return <Navbar logout={this.logout} />;
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(NavbarContainer);
