const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const { errorHandler } = require("./utils/errorHandler");

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
