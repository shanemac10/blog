angular.module('blogApp').controller('BlogCtrl', function($scope,$http,$uibModal){

  var promise = $http.get('/blogReturn'); // on page load, calls .get to get the blog posts and puts them in the promise

  promise.then(httpSuccess, httpError);   // after the promise is fulfiled, the returned blog posts are sent to httpSuccess to go to the $scope

  function httpSuccess(response) {        // makes the returned blog posts available to $scope
    $scope.blogPosts = response.data;
  }

  function httpError(response) {
    console.log('http error :', response);  //error habndling ...stuff
  }

  function getPosts() {   // this will be called other functions to re-populate the blog posts after a change is made
    $http.get('/blogReturn').then(function(response){
      $scope.blogPosts = response.data;
    });
  }

  $scope.popPost = function(postBack) {   //this is called when CREATE NEW POST and EDIT POST are clicked, and opens a modal window

    var modalInstance = $uibModal.open({
      templateUrl: 'post.html',   //loads html template
      controller: 'PopCtrl',   //loads modal controller for this instance
      resolve: {
        postPass: function() {return postBack;}		//brings a passed post along for the ride
      }
    });
    modalInstance.result.then(function() {			//then refresh the list after modal closes
      getPosts();
    });
  }


  $scope.popComment = function(postBack) {   //this is called when ADD COMMENT clicked, and opens a modal window

    var modalInstance = $uibModal.open({
      templateUrl: 'comment.html',   //loads html template
      controller: 'CommentCtrl',   //loads modal controller for this instance
      resolve: {
        postPass: function() {return postBack;}		//brings a passed post along for the ride
      }
    });
    modalInstance.result.then(function() {			//then refresh the list after modal closes
      getPosts();
    });
  }

});
