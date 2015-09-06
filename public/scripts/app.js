angular.module('youthVote', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {

		$routeProvider
		.when('/', {
			templateUrl: 'views/templates/home.html',
			controller: 'MainCtrl'
		})
		.when('/signup', {
			templateUrl: 'views/templates/signup.html',
			controller: "MainCtrl"
		})
		.otherwise({
        redirectTo: '/'
      });

		 $locationProvider.html5Mode({
		 	enabled: true,
		 	requireBase: false
		 	});

	}])

.controller('MainCtrl', ['$scope', function($scope) {
	$scope.test = "test"
}])