const jwt = require("jsonwebtoken");

const { getByEmail } = require("./user.service");

const login = (email, password) => {
  const user = getByEmail(email);

  if (!user || user.password !== password) {
    throw new Error(
      JSON.stringify({ message: "Invalid credentials", status: 401 })
    );
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
};

module.exports = { login };
