const users = require("../data/users");

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const user = users.find((user) => user.id === userId);

  if (!user) {
    throw new Error(JSON.stringify({ message: "User not found", status: 404 }));
  }

  return user;
};

const getByEmail = (email) => {
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error(JSON.stringify({ message: "User not found", status: 404 }));
  }

  return user;
};

const create = (user) => {
  const length = users.push({ id: users.length + 1, ...user });

  return users[length - 1];
};

const update = (id, user) => {
  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    throw new Error(JSON.stringify({ message: "User not found", status: 404 }));
  }

  foundUser.email = user.email;
  foundUser.name = user.name;
  foundUser.password = user.password;
  foundUser.type = user.type;

  return foundUser;
};

const deleteById = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new Error(JSON.stringify({ message: "User not found", status: 404 }));
  }

  users.splice(index, 1);

  return true;
};

module.exports = { getAll, getById, getByEmail, create, update, deleteById };
