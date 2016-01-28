angular.module('app').controller('GauntletCtrl', function($scope, $http, API_URL, $state, $location, $window, $ionicNavBarDelegate) {
  
  $scope.$on('$ionicView.enter', function(){  
  var email = $window.localStorage.email;

  $http.post(API_URL + 'getTeamName', {
    email: email
  })
  .success(function(team) {
    var test = team;
      if (test.teams[0]) {
        $scope.userInTeam = true;
      } else {
        $scope.userInTeam = false;
      }
      console.log('Gauntlet', $scope.userInTeam);
    });
  });

});
 

