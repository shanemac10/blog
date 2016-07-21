var mongoose = require('mongoose');

var BlogPost = mongoose.model('BlogPost', {
  title : String,
  body : String,
  timestamp: Date,
  edited : String,

  user: {type:mongoose.Schema.Types.ObjectId, ref:'User'},		// Reference to the User model

  comments : [{
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    body : String,
    timestamp : Date
  }]
});

module.exports = BlogPost;
