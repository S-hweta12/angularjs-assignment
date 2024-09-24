'use strict';

angular.
  module('angularJsApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/followers', {
          template: '<followers-list></followers-list>'
        }).
        otherwise('/followers');
    }
  ]);
