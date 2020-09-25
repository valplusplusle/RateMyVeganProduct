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

app.post('/upvote', function (req, res, next) {
  console.log('Got body:', req.body);
  upvoteProduct(req.body)
  res.sendStatus(200);
})

app.post('/downvote', function (req, res, next) {
  console.log('Got body:', req.body);
  downvoteProduct(req.body)
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

function upvoteProduct(jsonData) {
  console.log(jsonData.id)
  db.find({ _id: jsonData.id }, function (err, docs) {
    var newScore = docs[0].score + 1
    db.update(
      { _id: jsonData.id}, 
      { $set: { score: newScore} },
      {},
      function (err, numReplaced) {
        console.log(numReplaced);
      }
      );
  });
}

function downvoteProduct(jsonData) {
  console.log(jsonData.id)
  db.find({ _id: jsonData.id }, function (err, docs) {
    var newScore = docs[0].score - 1
    db.update(
      { _id: jsonData.id}, 
      { $set: { score: newScore} },
      {},
      function (err, numReplaced) {
        console.log(numReplaced);
      }
      );
  });
}

