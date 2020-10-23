var express = require("express");
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use(bodyParser.text({ limit: '200mb' }));
var Datastore = require('nedb')
  , db = new Datastore({ filename: './database', autoload: true });

app.use(cors())

app.get('/', function (req, res, next) {
  db.find({}, function (err, docs) {
    res.json(docs)
  });
})

app.post('/newProduct', function (req, res, next) {
  console.log('Got body new Product');
  addProductToDatabase(req.body)
  res.sendStatus(200);
})

app.post('/upvote', function (req, res, next) {
  console.log('Got body new upvote');
  upvoteProduct(req.body)
  res.sendStatus(200);
})

app.post('/downvote', function (req, res, next) {
  console.log('Got body new downvote');
  downvoteProduct(req.body)
  res.sendStatus(200);
})

app.post('/remove', function (req, res, next) {
  console.log('Remove Product');
  removeProduct(req.body)
  res.sendStatus(200);
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function addProductToDatabase(jsonData) {

  var uniqueId = makeid(6)
  require("fs").writeFile(uniqueId+".png", jsonData.file, 'base64', function(err) {
    console.log(err);
  });

    var doc = { name: jsonData.productName
  , info: jsonData.productInfo
  , typ: jsonData.productTyp
  , file: uniqueId+".png"
  , score: 0
  };
  db.insert(doc, function (err, newDoc) {});
}

function upvoteProduct(jsonData) {
  db.find({ _id: jsonData.id }, function (err, docs) {
    var newScore = docs[0].score + 1
    db.update(
      { _id: jsonData.id}, 
      { $set: { score: newScore} },
      {},
      function (err, numReplaced) {
      }
      );
  });
}

function downvoteProduct(jsonData) {
  db.find({ _id: jsonData.id }, function (err, docs) {
    var newScore = docs[0].score - 1
    db.update(
      { _id: jsonData.id}, 
      { $set: { score: newScore} },
      {},
      function (err, numReplaced) {
      }
      );
  });
}

function removeProduct(jsonData) {
  db.remove({
    _id: jsonData.id
   })
}