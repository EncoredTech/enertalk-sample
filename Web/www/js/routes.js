/* State router for the app */
angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider   
  
  .state('tab.api', {
    url: '/api',
    views: {
      'tab-api': {
        templateUrl: 'templates/tab-api.html',
        controller: 'ApiCtrl'
      }
    }
  })

  .state('tab.card', {
    url: '/card',
    views: {
      'tab-card': {
        templateUrl: 'templates/tab-card.html',
        controller: 'CardCtrl'
      }
    }
  })

  .state('tab', {
    url: '/tab',
    templateUrl: 'templates/tab.html',
    abstract:true
  })

  .state('enerTalkSignIn', {
    url: '/sign-in',
    templateUrl: 'templates/enerTalkSignIn.html',
    controller: 'EnerTalkSignInCtrl'
  })
  
// Show sign-in page by default
$urlRouterProvider.otherwise('/sign-in')

});