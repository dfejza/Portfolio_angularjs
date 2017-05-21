angular.module('myApp').controller('portfolioController', function($scope, $http,loadjson) {
	loadjson.getItems().then(function(response) { 
		$scope.data = json.page1;
		$scope.repos = json.page1.git.repos;

	});
});
