'use strict';

/**
 * @ngdoc overview
 * @name multilineStringToJavascriptConverterApp
 * @description
 * # multilineStringToJavascriptConverterApp
 *
 * Main module of the application.
 */
angular
  .module('multilineStringToJavascriptConverterApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'views/main.html',
        controller  : 'MainCtrl'
      })
      .otherwise({
        redirectTo : '/'
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('amber');
  });
