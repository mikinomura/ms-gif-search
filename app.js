// app.js
var express = require('express');
var app = express();

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/hello-world', function (req, res) {
  res.send('Hello World');
});

var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
})

app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
})

var http = require('http');
var giphy = require('giphy-api')();

app.get('/', function (req, res) {
  if (req.query.term == null) {
    var title = "Find what you make smile!"
    giphy.trending(function (err, response) {
      res.render('home', {gifs: response.data, title: title})
    });
  } else {
    giphy.search(req.query.term, function (err, response) {
      var title = "You are searching... " + req.query.term;
      res.render('home', {gifs: response.data, title: title})
    });
  }
});

app.use(express.static('public'));
