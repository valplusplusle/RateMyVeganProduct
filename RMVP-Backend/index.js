var express = require("express");
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var Datastore = require('nedb')
  , db = new Datastore({ filename: './database', autoload: true });

app.use(cors())


app.get('/', function (req, res, next) {
  db.find({}, function (err, docs) {
    res.json(docs)
  });
})

app.post('/newProduct', function (req, res, next) {
  console.log('Got body:', req.body);
  addProductToDatabase(req.body)
  res.sendStatus(200);
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

function addProductToDatabase(jsonData) {
  console.log(jsonData.productName)
    var doc = { name: jsonData.productName
  , info: jsonData.productInfo
  , typ: jsonData.productTyp
  , score: 0
  };
  db.insert(doc, function (err, newDoc) {});
}