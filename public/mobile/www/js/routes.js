angular.module('app')

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $stateProvider

  .state('app', {
    abstract: true,
    templateUrl: 'templates/sidemenu.html',
    controller: 'SideMenuCtrl',
  })

  .state('app.register', {
    url: '/register',
    views: {
      'app-nav': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'app-nav': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.logout', {
    url: '/logout'
  })

  .state('app.createTeam', {
    url: '/create-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/createteam.html',
        controller: 'CreateTeamCtrl'
      }
    }
  })

  .state('app.joinTeam', {
    url: '/join-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/jointeam.html',
        controller: 'JoinTeamCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/',
    views: {
      'app-nav': {
        templateUrl: 'templates/home.html',
      }
    },
    resolve: {
      redirectIfLoggedIntoHome: redirectIfLoggedIntoHome
    }
  })

  .state('app.roster', {
    url: '/roster',
    views: {
      'app-nav': {
        templateUrl: 'templates/roster.html',
        controller: 'RosterCtrl'
      }
    }
  })

  .state('app.gauntlet', {
    url: '/gauntlet',
    views: {
      'app-nav': {
        templateUrl: 'templates/gauntlet.html',
        controller: 'GauntletCtrl'
      }
    }
  })

  .state('app.theTeam', {
    url: '/the-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/theteam.html',
        controller: 'theTeamCtrl'
      }
    }
  })

  .state('app.submissions', {
    url: '/submissions',
    views: {
      'app-nav': {
        templateUrl: 'templates/submissions.html'
      }
    }
  })

  .state('app.challenges', {
    url: '/challenges',
    views: {
      'app-nav': {
        templateUrl: 'templates/challenges.html'
      }
    }
  }) 

  .state('app.tapChallenge', {
    url: '/tapchallenge',
    views: {
      'app-nav': {
        templateUrl: 'templates/tapchallenge.html'
      }
    }
  })

  .state('app.shakeChallenge', {
    url: '/shakechallenge',
    views: {
      'app-nav': {
        templateUrl: 'templates/shakechallenge.html'
      }
    }
  }) 

  .state('app.selfieChallenge', {
    url: '/selfiechallenge',
    views: {
      'app-nav': {
        templateUrl: 'templates/selfiechallenge.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/');  

  function skipIfLoggedIn($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  function redirectIfLoggedIntoHome($q, $location, $auth) {
    var deferred = $q.defer();
    if (!$auth.isAuthenticated()) {
      deferred.resolve();
    } else {
       $location.path('/gauntlet');
    }
    return deferred.promise;
  }

  function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }
})
.config(function($authProvider, API_URL) {
  var commonConfig = {
    popupOptions: {
      location: 'no',
      toolbar: 'no',
      width: window.screen.width,
      height: window.screen.height
    }
  };

  if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
    $authProvider.cordova = true;
    commonConfig.redirectUri = API_URL;
  }

  $authProvider.loginUrl = API_URL + 'login';

  $authProvider.signupUrl = API_URL + 'register';

  $authProvider.facebook(angular.extend({}, commonConfig, {
    clientId: '756912801119797',
    url: API_URL + 'auth/facebook'
  }));

})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
})

.constant('API_URL', 'http://localhost:8000/');
// .constant('API_URL', 'http://ec2-52-89-69-134.us-west-2.compute.amazonaws.com/');
