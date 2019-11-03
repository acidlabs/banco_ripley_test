// Node Modules
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

// Actions
import { SET_TOKEN } from "../../redux/actions";

// Components
import Login from "../../components/login";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null
    };
  }
  login = async e => {
    const { email, password } = this.state;
    const { dispatch, history } = this.props;

    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password
      });

      if (res.data.error !== null) {
        const { code, message } = res.data.error;
        return this.setState({ error: { code, message } });
      }

      const { data } = res.data;

      await dispatch({ type: SET_TOKEN, payload: { ...data } });

      return history.push("/");
    } catch (error) {
      throw error;
    }
  };

  signup = () => {
    const { history } = this.props;
    return history.push("/signup");
  };

  setEmail = e => this.setState({ email: e.target.value });
  setPassword = e => this.setState({ password: e.target.value });
  render() {
    const { email, password, error } = this.state;
    return (
      <Login
        login={this.login}
        email={email}
        password={password}
        setEmail={this.setEmail}
        setPassword={this.setPassword}
        error={error}
        signup={this.signup}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(LoginPage);
