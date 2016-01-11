angular.module('app')

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $stateProvider

  .state('app', {
    abstract: true,
    templateUrl: 'templates/sideMenu.html',
    controller: 'SideMenuCtrl'
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
    cache: false,
    url: '/create-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/createTeam.html',
        controller: 'CreateTeamCtrl'
      }
    }
  })

  .state('app.joinTeam', {
    url: '/join-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/joinTeam.html',
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
    }
  })

  .state('app.roster', {
    cache: false,
    url: '/roster',
    views: {
      'app-nav': {
        templateUrl: 'templates/roster.html',
        controller: 'RosterCtrl'
      }
    }
  })

  .state('app.gauntlet', {
    cache: false,
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
        templateUrl: 'templates/theTeam.html',
        controller: 'theTeamCtrl'
      }
    }
  })

  .state('app.submissions', {
    url: '/submissions',
    views: {
      'app-nav': {
        templateUrl: 'templates/submissions.html',
        controller: 'SubmissionCtrl'
      }
    }
  })

  .state('app.shakeChallenge', {
    url: 'shakechallenges',
    views: {
      'app-nav': {
        templateUrl: 'templates/shakeChallenge.html'
      }
    }
  })  

  .state('app.selfieChallenge', {
    url: 'selfiechallenges',
    views: {
      'app-nav': {
        templateUrl: 'templates/selfieChallenge.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/');  
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

  // if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
  //   $authProvider.cordova = true;
  //   commonConfig.redirectUri = 'http://localhost/';
  // }

  $authProvider.loginUrl = API_URL + 'login';

  $authProvider.signupUrl = API_URL + 'register';

  $authProvider.facebook(angular.extend({}, commonConfig, {
    clientId: '756912801119797',
    url: API_URL + 'auth/facebook'
  }));

})

.constant('API_URL', 'http://localhost:8000/');