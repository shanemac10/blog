var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: String,
    image: String

});

module.exports = User;
