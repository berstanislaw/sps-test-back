const { Router } = require("express");

const routes = Router();
const {
  getAll,
  getById,
  create,
  update,
  deleteById,
} = require("./services/user.service");
const { login } = require("./services/auth.service");

// User routes
routes.get("/users", (req, res) => {
  const users = getAll();
  res.status(200).json({ users });
});
routes.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = getById(Number(id));

  res.status(200).json({ user });
});

routes.post("/users", (req, res) => {
  const user = req.body;
  const response = create(user);

  res.status(201).json({ user: response });
});

routes.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const response = update(Number(id), user);

  res.status(200).json({ user: response });
});

routes.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  deleteById(Number(id));

  res.status(204).send();
});

// Auth routes
routes.post("/login", (req, res) => {
  const { email, password } = req.body;

  const response = login(email, password);

  res.status(200).json({ user: response });
});

module.exports = routes;
