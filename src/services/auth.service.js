const { getByEmail } = require("./user.service");

const login = (email, password) => {
  const user = getByEmail(email);

  if (user.password !== password) {
    throw new Error(
      JSON.stringify({ message: "Invalid credentials", status: 401 })
    );
  }

  return user;
};

module.exports = { login };
