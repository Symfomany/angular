angular
.module('todomvc', ["routeProvider"])
.config(function($routeProvider) {
  $routeProvider.when('/view1', {
      controller:'UserCtrl',
      templateUrl:'index.html',
      resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage.then(function (module) {
						module.get(); // Fetch the todo records in the background.
						return module;
					});
				}
			}
  });
});

angular.module('todomvc', [])
.controller('UserCtrl', function UserCtrl($scope, $http,$filter) {
  'use strict';

  var users = [];
  var remainingCount = 0;

  //load datas
  $http.get('http://jsonplaceholder.typicode.com/users').
    success(function(data, status) {
      $scope.users = users = data;
      users.forEach(function (user) {
  			user.completed = false;
  		});
  }).
    error(function(data, status) {
      console.log('erreur...');
  });

  $scope.todoChecked  = function(user){
    user.completed = !user.completed;
  }

  $scope.$watch('users', function () {
      // appelé a chaque fois que l'on interagi avec le tableau
  			$scope.remainingCount = $filter('filter')(users, { completed: false }).length;
  			$scope.completedCount = users.length - $scope.remainingCount;
  			$scope.allChecked = !$scope.remainingCount;
		}, true);



	$scope.filtreById = function () {
		users.forEach(function (user) {
			user.completed = !user.completed;
		});
	};

  $scope.addUser = function(){
    $scope.saving = true;

    users.push({
      name: $scope.name,
      username: $scope.username,
      email: $scope.email,
      address: $scope.address,
      phone: $scope.phone,
      website: $scope.website
    });

    store.insert(newTodo)
		.then(function success() {
			$scope.name = $scope.name = '';
		})
		.finally(function () {
			$scope.saving = false;
		});


    $scope.name = '';
  }

});
