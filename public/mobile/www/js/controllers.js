angular.module('app.controllers', ['ionic', 'ngCordova'])

.controller('gauntletCtrl', function($scope) {

})

.controller('theTeamCtrl', function($scope) {

})

.controller('TapController', function($scope, $http, $state, $ionicGesture, API_URL) {

  var email = window.localStorage.email;

  $scope.countTaps = function() {
    var tapCounter = 0;
    $scope.tapCount = 0;

    var stopTapCount = function() {

      $http.post(API_URL + 'completeChallenge', {
          email: email,
          challengeName: 'tapChallenge',
          comment: 'completed',
          submission: tapCounter.toString(),
          contentType: 'text/plain'
        })
        .success(function(){    
          $state.go('app.submissions');   
        })
        .error(function(err) {
          console.log('Already sumitted challenge. ' + err);
        });
    }
    
    $ionicGesture.on('tap', function(e) {
      tapCounter++;
      $scope.$apply(function() {
        $scope.tapCount = tapCounter;
      });
      console.log("tap count " + tapCounter);
    }, angular.element(document.getElementById('tap-view')));

    setTimeout(stopTapCount, 10000);

  }

})

.controller('ShakeController', function($scope, $http, $state, $cordovaDeviceMotion, API_URL) {

  var email = window.localStorage.email;

  $scope.countShakes = function() {
    var shakeCounter = 0;
    $scope.shakeCount = 0;

    var onShake = function () {
      shakeCounter++;
      $scope.$apply(function() {
        $scope.shakeCount = shakeCounter;
      });
      console.log("shake count " + shakeCounter);
    };

    var stopShakeCount = function() {
      shake.stopWatch();

      $http.post(API_URL + 'completeChallenge', {
          email: email,
          challengeName: 'shakeChallenge',
          comment: 'completed',
          submission: shakeCounter.toString(),
          contentType: 'text/plain'
        })
        .success(function(){    
          $state.go('app.submissions');   
        })
        .error(function(err) {
          console.log('Already sumitted challenge. ' + err);
        });
    }

    shake.startWatch(onShake, 10);

    setTimeout(stopShakeCount, 10000);
  }

})

.controller('ImageController', function($scope, $http, $state, $timeout, $cordovaCamera, API_URL, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService) {

  var email = window.localStorage.email;

  $scope.takePicture = function() {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = 'data:image/jpeg;base64,' + imageData;
      console.log("client " + $scope.imgURI);

      $http.post(API_URL + 'completeChallenge', {
          email: email,
          challengeName: 'selfieChallenge',
          comment: 'completed',
          submission: imageData,
          contentType: 'image/jpeg'
        })
        .success(function(){    
          $state.go('app.submissions');   
        })
        .error(function(err) {
          console.log('Already sumitted challenge. ' + err);
        });

    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

});
