angular.module('app').controller('LeaveTeamCtrl', function($scope, $http, $state, $window, API_URL) {

  
  $scope.leaveTeam = function() {

    $http.post(API_URL + 'leaveTeam', {
      email: $window.localStorage.email,
      teamName: $scope.teamInfo.teamName
    })
    .success(function() {
      $state.go('app.gauntlet');
      console.log('User removed from team');
    });
  };

});