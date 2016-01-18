angular.module('app').controller('ChallengesCtrl', function($scope, $http, API_URL, $window) {

  $scope.$on('$ionicView.enter', function(){  
    var email = $window.localStorage.email;

    $scope.teamInfo = {
      users: [],
      teamName: ''
    };
    $scope.challenges = [];

    $http.post(API_URL + 'getTeamName', {
      email: email
    })
    .success(function(teams) {
      var team = teams['teams'][0].teamName;
      console.log('test', team);
      $scope.teamInfo.teamName = team;

      $http.post(API_URL + 'listTeamChallenges', {
          teamName: team
        })
        .success(function(challenges) {
          console.log(JSON.stringify(challenges));
          for (var i = 0; i < challenges["challenges"].length; i++) {
            $scope.challenges.push(challenges["challenges"][i]["challengeName"]);
          }
          console.log("challenge names " + JSON.stringify($scope.challenges));
        })
        .error(function(err) {
          console.log('Could not retrive challenge list ' + err)
        });

    })
    .error(function(err) {
      console.log('Could not retrive team info ' + err);
    });
  });

});