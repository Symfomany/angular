angular
.module('todomvc', ["routeProvider"])
.config(function($routeProvider) {
  var routeConfig = {
			controller: 'UserCtrl',
			templateUrl: 'index.html',
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage.then(function (module) {
						module.get(); // Fetch the todo records in the background.
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});

});

angular.module('todomvc', [])

.controller('UserCtrl', function UserCtrl($scope, $http, $filter) {
  'use strict';

  var users = [];
  
  //load datas
  $http.get('http://beta.json-generator.com/api/json/get/4kbKfU1N-').
    success(function(data, status) {
      $scope.users = users = data;
      users.forEach(function (user) {
  			user.completed = false;

        $http.get('http://api.randomuser.me/?nat=fr').
          success(function(data, status) {
            user.dob = data.dob;
            user.registered = data.registered;
        }).
          error(function(data, status) {
            console.log('erreur...');
        });
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


    // Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
      console.log("route changée");
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
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
