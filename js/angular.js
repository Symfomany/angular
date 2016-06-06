angular.module('todomvc', [])

.controller('UserCtrl', function UserCtrl($scope, $http) {
  'use strict';

  //load datas
  $http.get('http://jsonplaceholder.typicode.com/users').
    success(function(data, status) {
      $scope.users = data;
  }).
    error(function(data, status) {
      console.log('erreur...');
  });



  $scope.addUser = function(){
    $scope.users.push({
      name: $scope.name,
      username: $scope.username,
      email: $scope.email,
      address: $scope.address,
      phone: $scope.phone,
      website: $scope.website
    });

    $scope.name = '';
  }

});
