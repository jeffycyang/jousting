angular.module('app').controller('SideMenuCtrl', function($scope, $auth, $http, $window, API_URL) {
  

  $scope.$on('$ionicView.enter', function(){ 
    var email = $window.localStorage.email;

    $http.post(API_URL + 'getTeamName', {
      email: email
    })
    .success(function(team) {
      var test = team;
      if (test.teams[0]) {
        $scope.userIsInTeam = true;
      } else {
        $scope.userIsInTeam = false;
      }
      console.log('Sidemenu', $scope.userIsInTeam);
    });
});

});
