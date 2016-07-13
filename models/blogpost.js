var mongoose = require('mongoose');

var BlogPost = mongoose.model('BlogPost', {
  title : String,
  body : String,
  time : Date,
  user : String
});

module.exports = BlogPost;
