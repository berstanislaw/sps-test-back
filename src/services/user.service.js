const yup = require("yup");
const users = require("../data/users");

let createUserSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  type: yup.string().oneOf(["admin", "user"]).required(),
});

let updateUserSchema = yup.object({
  email: yup.string().email().optional(),
  name: yup.string().optional(),
  password: yup.string().optional(),
  type: yup.string().oneOf(["admin", "user"]).optional(),
});

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

  return user;
};

const create = (user) => {
  createUserSchema.validateSync(user);

  const emailTaken = getByEmail(user.email);
  if (emailTaken) {
    throw new Error(
      JSON.stringify({ message: "Email already taken", status: 400 })
    );
  }

  const length = users.push({
    id: users.length + 1,
    name: user.name,
    email: user.email,
    password: user.password,
    type: user.type,
  });

  return users[length - 1];
};

const update = (id, user) => {
  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    throw new Error(JSON.stringify({ message: "User not found", status: 404 }));
  }

  updateUserSchema.validateSync(user);

  if (user.email) foundUser.email = user.email;
  if (user.name) foundUser.name = user.name;
  if (user.password) foundUser.password = user.password;
  if (user.type) foundUser.type = user.type;

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
