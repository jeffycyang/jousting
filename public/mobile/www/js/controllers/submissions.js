angular.module('app').controller('SubmissionCtrl', function($scope, $state, $http, $timeout, $q, API_URL, $window) {
    
  $scope.imgURL = [];
  $scope.taps = [];
  $scope.shakes = [];
  var email = window.localStorage.email;
  console.log("email "+email);
  
  $scope.teamInfo = {
    users: [],
    teamName: ''
  };

  var usersInTeam;
  $scope.challengesInTeam;

  $http.post(API_URL + 'getTeamName', {
    email: email
  })
  .success(function(teams) {
    console.log(JSON.stringify(teams));
    var teamUserIsIn = teams['teams'][0]["teamName"];
    $scope.teamInfo.teamName = teamUserIsIn;
    console.log('This is the scope.teamInfo.teamName: ' + $scope.teamInfo.teamName);
      $http.post(API_URL + 'roster', {
        teamName: teamUserIsIn
      }).success(function(users) {
        usersInTeam = users['users'];
        $scope.teamInfo.users = usersInTeam;
        console.log(JSON.stringify($scope.teamInfo.users));

        // var imgURL = [];
        // var tapURLs = [];
        // // var shakeURL = [];

        // var getTapSub = function(ind){
        //   console.log("index WTF"+ind);
        //   return $http.get(API_URL + 'getSubmissionInfo/' + usersInTeam[ind]['userName'] + '/tapChallenge')
        //   .success(function(tapSub){
        //     console.log("taps bro "+tapSub);
        //     if(!$scope.taps[ind]){
        //       $scope.taps[ind] = tapSub;
        //     }
        //   });
        // }
        // for(var i = 0 ; i < usersInTeam.length ; i++){
        //   console.log(usersInTeam[i]['userName']);
        //   // $scope.imgURL.push(API_URL + 'getSubmissionInfo/' + usersInTeam[i]['userName'] + '/selfieChallenge');
        //   imgURL.push(API_URL + 'getSubmissionInfo/' + usersInTeam[i]['userName'] + '/selfieChallenge');
        //   // tapURLs.push(API_URL + 'getSubmissionInfo/' + usersInTeam[i]['userName'] + '/tapChallenge');
        //   tapURLs[i] = getTapSub(i);
        //   // $scope.shakeURL.push(API_URL + 'getSubmissionInfo/' + usersInTeam[i]['userName'] + '/shakeChallenge');
        // }
        // for(var j=0;j<tapURLs.length;j++){
        //     tapURLs[j]();
        // }
        // // for(var j = 0 ; j < imgURL.length ; j++){
        // // $scope.$apply(function(){
        //   $scope.$evalAsync(function(){
        //     for(var j = 0 ; j < imgURL.length ; j++){
        //       // $scope.$apply(function(){
        //         $scope.imgURL.push(imgURL[j]);
        //         // $scope.imgURL;
        //         console.log("wtf "+$scope.imgURL);
        //       // });
        //     }
        //   });
        // // });
        // // }

        $http.post(API_URL + 'listChallengeSubmissions', {
          challengeName: 'tapChallenge'
        }).success(function(tapSubs) {
          $scope.taps = tapSubs.submissions;
          console.log("taps "+tapSubs.submissions);
          $http.post(API_URL + 'listChallengeSubmissions', {
            challengeName: 'shakeChallenge'
          }).success(function(shakeSubs) {
            console.log("shakes "+shakeSubs.submissions);
            $scope.shakes = shakeSubs.submissions;
            $http.post(API_URL + 'listChallengeSubmissions', {
              challengeName: 'selfieChallenge'
            }).success(function(imgSubs) {
              $scope.imgURL = imgSubs.submissions;
            });
          });
        });

      })
      .error(function(err) {
        console.log('Could not retrieve roster list ' + err);
      });

    })
    .error(function(err) {
      console.log('Could not retreive user info ' + err);
  });

});