angular.module('app').controller('LoginCtrl', function($scope, $http, $auth, $state, $window, $ionicPopup) {
  
  $scope.submit = function() {
    $auth.login({
      email: $scope.user.email,
      password: $scope.user.password
    })
    .then(function(res) {
      var storage = $window.localStorage;
      storage.setItem('email', res.data.user.email); 
      $state.go('app.gauntlet');
    })
    .then(function(res) {
      $ionicPopup.alert({
        title: 'Success',
        content: 'You have successfully logged in!'
      });
    })
    .catch(handleError);
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function(res) {
      var storage = $window.localStorage;
      storage.setItem('email', res.data.user.email);
      $state.go('app.gauntlet');
    })
    .then(function(res) {
      $ionicPopup.alert({
        title: 'Success',
        content: 'You have successfully logged in!'
      });
    })
    .catch(handleError);
  };

function handleError(err) {
  $ionicPopup.alert({
    title: 'Error',
    content: err.data.message
  });
}

});