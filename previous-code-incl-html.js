const express = require('express');
const app = express();
const bodyParser= require('body-parser');

app.use( bodyParser.urlencoded({extended: true}) );

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
    // res.send("Hello World");
  // do something here
});

app.post('/quotes', (req, res) => {
  console.log(req.body);
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server started on ' + port);
console.log(__dirname);


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MY APP</title>
</head>

<form action="/quotes" method="POST">
  <input type="text" placeholder="name" name="name">
  <input type="text" placeholder="quote" name="quote">
  <button type="submit">Submit</button>
</form>

</html>