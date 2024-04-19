const express = require("express");

const api = express();
const port = process.env.PORT || 8080;

api.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);