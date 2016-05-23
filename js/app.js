var myApp = angular.module('myApp',
  ['ngRoute', 'firebase', 'ui.bootstrap'])
  .constant('FIREBASE_URL', 'https://ang-reg.firebaseio.com/');

myApp.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error){
    if(error=='AUTH_REQUIRED'){
      $rootScope.message = 'Sorry';
      $location.path('/login');
    } // AUTH REQUIRED
  }); // INFO 
}]); // RUN

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/match', {
      templateUrl: 'views/match.html',
      controller: 'MatchCtrl',
      // controllerAs: 'mlist',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } // resolve
    }).
    when('/show', {
      templateUrl: 'views/show.html',
      controller: 'SecondCtrl',
      controllerAs: 'show'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);