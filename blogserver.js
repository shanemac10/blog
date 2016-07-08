var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('./public'));
app.use(bodyParser());

var blogPosts = [];

app.get('/blogReturn', function(req, res){
  res.json(blogPosts);
});

app.post('/blogReturn/', function(req,res){
  var newPost = req.body;
  blogPosts.push(newPost);
  console.log(newPost);
  res.json(blogPosts);
});

app.listen(8080, function() {
  console.log('App listening at http://localhost:8080');

});

// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
