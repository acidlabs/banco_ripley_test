// Node Modules
import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ logout }) => (
  <ul className="nav justify-content-end">
    <li className="nav-item">
      <a className="nav-link active" href="/">
        Home
      </a>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        onClick={() => logout()}
        tabIndex="-1"
        aria-disabled="true"
      >
        Logout
      </a>
    </li>
  </ul>
);

Navbar.propTypes = {
  logout: PropTypes.func
};

export default Navbar;
