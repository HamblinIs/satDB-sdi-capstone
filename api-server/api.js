const express = require("express");
const cors = require('cors');
const api = express();
const port = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')['development'])

app.use(cors(), express.json())

api.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);