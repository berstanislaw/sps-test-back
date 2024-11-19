const errorHandler = (err, req, res, next) => {
  const { message, status } = JSON.parse(err.message);

  const response = {
    code: status,
    message,
  };

  res.status(status).send(response);
};

module.exports = { errorHandler };
