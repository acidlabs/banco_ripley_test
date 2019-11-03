// Node Modules
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Containers
import LoginPage from "./containers/login";
import SignupPage from "./containers/signup";
import HomePage from "./containers/home";
import ProductDetailPage from "./containers/product-detail";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/product/:id" component={ProductDetailPage} />
    </Switch>
  </Router>
);

export default App;
