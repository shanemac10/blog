var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/okcoders');

app.use(express.static('./public'));
app.use(bodyParser());

var BlogPost = require('./models/blogpost');
var User = require('./models/user');

app.get('/blogReturn', function(req, res){
  BlogPost.find().populate('user').populate('comments.user').sort({timestamp:-1}).exec().then(function(blogPosts){
    res.json(blogPosts);
  });
});

function initUsers() {                            // This function first checks if data exists and adds it if it doesn't
  return User.count().then(function(count) {    // Count how many users are in our database
    if(count) return;                         // If even one exists, don't create anymore and bail out.

    var userList = [                          // Define our list of users that we want inserted if there is none found
      {name:'Sergi',    image:'34.png'},
      {name:'Diana',    image:'49.png'},
      {name:'Katy',     image:'8.png'},
      {name:'Preston',  image:'35.png'},
      {name:'Brain',    image:'3.png'},
      {name:'Eva',      image:'38.png'},
      {name:'Yahya',    image:'48.png'},
      {name:'Shandy',   image:'16.png'},
      {name:'Shane',    image:'23.png'},
      {name:'Anonymous', image:'17.png'}
    ];

    userList.forEach(function(user) {      // Loop through each element
      user = new User(user);               // Create a document from our model
      return user.save();                 // Save the document
    });
  });
}
initUsers(); //runs the program^^^

app.get('/userReturn', function(req, res) { //returns all the users, put into a json list
  User.find().populate('user').sort({name: 1}).exec().then(function(userList){
    res.json(userList);
  });
});


app.post('/blogReturn', function(req,res){  //adds or updates a post
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
