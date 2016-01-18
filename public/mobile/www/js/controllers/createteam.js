angular.module('app').controller('CreateTeamCtrl', function($scope, $http, $state, $window, API_URL) {
  
  $scope.$on('$ionicView.enter', function(){ 
    var email = $window.localStorage.email;

    $scope.team = {teamName: '', createdBy: ''};

    $scope.createTeam = function() {
      $http.post(API_URL + 'createTeam', {
        email: email,
        teamName: $scope.team.teamName
      })
      .success(function() {
        $http.post(API_URL + 'createChallenge', {
          points: 3,
          teamName: $scope.team.teamName,
          challengeName: 'selfieChallenge'
        })
        .success(function() {
          $http.post(API_URL + 'createChallenge', {
            points: 5,
            teamName: $scope.team.teamName,
            challengeName: 'shakeChallenge'
          })
          .success(function() {
            $http.post(API_URL + 'createChallenge', {
              points: 7,
              teamName: $scope.team.teamName,
              challengeName: 'tapChallenge'
            })
            .success(function() {
              var storage = $window.localStorage;
              storage.setItem('team', $scope.team.teamName);
              console.log($scope.team.teamName + ' has entered the gauntlet!');
              $state.go('app.roster');
            })
            .error(function(err) {
              $state.go('app.createTeam');
              console.log('Tap Challenge already exists. '+err);
            });
          })
          .error(function(err) {
            $state.go('app.createTeam');
            console.log('Shake Challenge already exists. '+err);
          });
        })
        .error(function(err) {
          $state.go('app.createTeam');
          console.log('Selfie Challenge already exists. '+err);
        });
      })
      .error(function(err) {
        $state.go('app.createTeam');
        console.log('Team already exists. '+err);
      });
    
    };
  });

});
