const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Allows us to read data from front end  
app.use( bodyParser.urlencoded( {extended: true} ) );
// Make public folder accessible using built-in express middleware 
app.use( express.static('public') );
// Tell server to read json using bodyParser middleware / plugin
app.use( bodyParser.json() );
// Tell express to use the ejs templating engine
app.set('view engine', 'ejs');
// Globally available db variable created in MongoClient anon function
var db;

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    // renders index.ejs
    res.render('index.ejs', { quotes: result });
  });
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'});
  });
});

MongoClient.connect(process.env.MONGO_TEST_URL, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, function() {
    console.log('listening on 3000');
    // console.log(__dirname);
    // db.collection('quotes').find().toArray(function(err, results) {
      // console.log(results);
    });
  });

// Basic test to see if Express is working - transferred out to Mongo anon function
// app.listen(3000, function() {
//   console.log('listening on 3000');
// });

// *** Just sends the pure text:
// app.get('/', (req, res) => {
//   res.send('hello world');
// });

// *** Sends the full html file in the directory
// app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  // Note: __dirname is directory that contains the JavaScript source code.
  // Logs out full directory name in terminal:
  // console.log(__dirname);
// });

// **** This proves that Express can detect what we are writing in the form.
// app.post('/quotes', (req, res) => {
  // body-parser extracts data from <form> element and adds it to body property of request object:
  // console.log(req.body);
// });