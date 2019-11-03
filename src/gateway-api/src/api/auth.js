const { Router } = require("express");
const AuthService = require("../services/js/auth-api");

const routes = Router();

routes.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === undefined) {
    return res.status(400).json({ error: "email body param not found" });
  }

  if (password === undefined) {
    return res.status(400).json({ error: "password body param not found" });
  }

  // initialize auth service
  const auth = new AuthService();

  //generate token with grpc auth service
  auth
    .login(email, password)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

routes.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (email === undefined) {
    return res.status(400).json({ error: "email body param not found" });
  }

  if (password === undefined) {
    return res.status(400).json({ error: "password body param not found" });
  }

  // initialize auth service
  const auth = new AuthService();

  //generate token with grpc auth service
  auth
    .signup(email, password)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

routes.post("/verifyToken", (req, res) => {
  const { token } = req.body;
  if (token === undefined) {
    return res.status(400).json({ error: "token body param not found" });
  }

  // initialize auth service
  const auth = new AuthService();

  //blacklist token with grpc auth service
  auth
    .verifyToken(token)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = routes;
