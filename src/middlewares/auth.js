const jwt = require("jsonwebtoken");
const { getById } = require("../services/user.service");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, "secret");

    const { id, email } = decoded;

    const idUser = getById(Number(id));

    if (!idUser || idUser.email !== email) {
      res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { auth };
