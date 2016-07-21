angular.module('blogApp').controller('PopCtrl', function($scope,$uibModal,$uibModalInstance,$http,postPass) {		// Inject our dependencies and postPass

  $scope.postMe = angular.copy(postPass); //populates the form with the data in the postBack that we passed as postPass here

  if(!$scope.postMe) {$scope.saveButton = "Save Post";} else {$scope.saveButton = "Update Post" ;} //checks if a post was passed when the modal was called, and changes the saveButton's face. If there was a post then it's being edited.

  $http.get('/userReturn').then(function(res){$scope.users = res.data;});   // get our user list for the drop down menu

  $scope.savePost = function() {  //What happens when saveButton is clicked

    if(!$scope.postMe.timestamp){  //if there's no timestamp then we know it's a new user- and we can give them some starter info
      $scope.postMe.timestamp = new Date();
    } else {
      $scope.postMe.edited = "EDITED";  //no timestamp means this post is being edited, so we will display this as a badge in the blog
    }

    $http.post('/blogReturn',$scope.postMe).then(function(response){  // Pushes the post to the server, where it will be added or updated accordingly
      $uibModalInstance.close();
    });

  };

  $scope.killPost = function(killMe) {  // What happens when the Delete button is clicked

    $http.delete('/blogReturn/'+killMe._id).then(function(){    // deletes the selected blog post from the database
      $uibModalInstance.close();
    });

  };

  $scope.cancel = function() {  // What happens when the Cancel button is clicked
    $uibModalInstance.dismiss();   // drops out of the modal via Cancel button
  }

}); //End PopCtrl
