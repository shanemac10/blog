var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/okcoders');

app.use(express.static('./public'));
app.use(bodyParser());

var BlogPost = require('./models/blogpost');

app.get('/blogReturn', function(req, res){
  BlogPost.find().sort({timestamp:-1}).exec().then(function(blogPosts){
    res.json(blogPosts);
  });
});

app.post('/blogReturn', function(req,res){
  var newPost = req.body;

  if(newPost._id) {
    BlogPost.findOneAndUpdate({_id:newPost._id}, newPost).exec().then(function(){
      res.json(true);
    });
  } else {
    var sendPost = new BlogPost(newPost);
    sendPost.save().then(function(){
      res.json(true);
    });
  }
});

app.delete('/blogReturn/:id', function(req, res){
  var killMe = req.params.id;
  BlogPost.findOneAndRemove({_id:killMe}).exec().then(function(){
    res.json(true);
  });
});

app.listen(8080, function() {
  console.log('App listening at http://localhost:8080');
});

// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
