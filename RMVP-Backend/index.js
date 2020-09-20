var express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
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
  res.sendStatus(200);
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

function addProductToDatabase() {
    var doc = { name: 'Vegan Test Tofu'
  , info: 'Text about the Product'
  , picture: 'link/to/picture'
  , score: 0
  };
  db.insert(doc, function (err, newDoc) {});
}