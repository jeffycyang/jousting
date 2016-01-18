angular.module('app').controller('RegisterCtrl', function($scope, $auth, $state, $window) {

$scope.submit = function () {

    $auth.signup({
      fullName: $scope.user.fullName,
      userName: $scope.user.userName,
      email: $scope.user.email,
      password: $scope.user.password
    })
    .then(function (res) {
      $auth.setToken(res);
      var storage = $window.localStorage;
      storage.setItem('email', res.data.user.email);
      $state.go('app.gauntlet');
      console.log('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '! Please email activate your account in the next several days.');
    })
    .catch(function (err) {
      console.log('warning', 'Unable to create account :(', err.message);
    });
  };

});