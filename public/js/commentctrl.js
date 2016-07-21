angular.module('blogApp').controller('CommentCtrl', function($scope,$uibModal,$uibModalInstance,$http,postPass) {		// Inject our dependencies and postPass

  $scope.postMe = angular.copy(postPass); //populates the form with the data in the postBack that we passed as postPass here

  $http.get('/userReturn').then(function(res){$scope.users = res.data;});   // get our user list for the drop down menu

  $scope.savePost = function() {  //What happens when saveButton is clicked

    var dummyComment = {
      user: $scope.postMe.comments.user,
      body: $scope.postMe.comments.body,
      timestamp: new Date()
    };

    postPass.comments.push(dummyComment);

    $http.post('/blogReturn',postPass).then(function(response){  // Pushes the post to the server, where it will be added or updated accordingly
      $uibModalInstance.close();
    });

  };

  $scope.cancel = function() {  // What happens when the Cancel button is clicked
    $uibModalInstance.dismiss();   // drops out of the modal via Cancel button
  }

}); //End CommentCtrl
