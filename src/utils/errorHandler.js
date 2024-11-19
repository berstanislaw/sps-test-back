const errorHandler = (err, req, res, next) => {
  try {
    const { message, status } = JSON.parse(err.message);

    const response = {
      code: status,
      message,
    };

    res.status(status).send(response);
  } catch (error) {
    console.error(error);

    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { errorHandler };
