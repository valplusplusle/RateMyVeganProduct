var express = require("express");
var cors = require('cors');
var app = express();
var products = require("./products.json");

app.use(cors())

app.get('/', function (req, res, next) {
    res.json(products)
  })

app.listen(3000, () => {
    console.log("Server running on port 3000");
});