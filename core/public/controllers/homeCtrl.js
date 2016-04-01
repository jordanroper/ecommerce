var app = angular.module('eCommerce')

.controller('homeCtrl', function($scope, homeService){

  $scope.test = homeService.testing;
});
