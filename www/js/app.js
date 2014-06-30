// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('iRiver', ['ionic', 'iRiver.controllers', 'iRiver.services', 'highcharts-ng'])

.run(function($rootScope, $ionicPlatform, BusyService) {
  
  $rootScope.isWebView = ionic.Platform.isWebView();

  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  /*
   * here we watch globally for loading events and show busy indicator
   */
  $rootScope.$watch("loader_show", function(e){
      e ? BusyService.show() :BusyService.hide();
  });  

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  // TODO not sure if this is really needed - i've tested without it and it seems to work on my mac
  //$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.favorites', {
      url: "/favorites",
      views: {
        'menuContent' :{
          templateUrl: "templates/favorites.html"
        }
      }
    })
    .state('app.states', {
      url: "/states",
      views: {
        'menuContent' :{
          templateUrl: "templates/states.html",
          controller: 'StateListCtrl'
        }
      }
    })
    .state('app.single', {
      url: "/states/:stateId",
      views: {
        'menuContent' :{
          templateUrl: "templates/stateDetail.html",
          controller: 'StateCtrl'
        }
      }
    })
    .state('app.river', {
      url: "/states/:stateId/:gageId",
      views: {
        'menuContent' :{
          templateUrl: "templates/riverDetail.html",
          controller: 'RiverCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/states');


});

