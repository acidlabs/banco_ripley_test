// Node Modules
import React from "react";
import PropTypes from "prop-types";

// Style
import "./styles.scss";

const Signup = ({
  login,
  signup,
  username,
  password,
  setPassword,
  setEmail,
  error
}) => (
  <div className="limiter">
    <div className="container-login100 login">
      <div className="wrap-login100 p-t-190 p-b-30">
        {error !== null && (
          <div className="alert alert-danger" role="alert">
            {error.message}
          </div>
        )}
        <form className="login100-form validate-form">
          <div className="login100-form-avatar">
            <img src="ripley.jpeg" alt="AVATAR" />
          </div>

          <span className="login100-form-title p-t-20 p-b-45">Registrate!</span>

          <div
            className="wrap-input100 validate-input m-b-10"
            data-validate="Username is required"
          >
            <input
              className="input100"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={e => setEmail(e)}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-user"></i>
            </span>
          </div>

          <div
            className="wrap-input100 validate-input m-b-10"
            data-validate="Password is required"
          >
            <input
              className="input100"
              type="password"
              name="pass"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e)}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-lock"></i>
            </span>
          </div>

          <div className="container-login100-form-btn p-t-10">
            <button className="login100-form-btn" onClick={e => signup(e)}>
              Signup
            </button>
          </div>

          <div className="text-center w-full p-t-25 p-b-230">
            <a onClick={() => login()} className="txt1">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
);

Signup.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  login: PropTypes.func,
  signup: PropTypes.func,
  error: PropTypes.shape({
    code: PropTypes.number,
    message: PropTypes.string
  })
};

export default Signup;
