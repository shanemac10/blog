var mongoose = require('mongoose');

var BlogPost = mongoose.model('BlogPost', {
  title : String,
  body : String,
  time : String,
  user : String,
  timestamp: Date,
  edited : String
});

module.exports = BlogPost;
