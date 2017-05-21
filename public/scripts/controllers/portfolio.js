angular.module('myApp').controller('portfolioController', function($scope, $window, $http, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
	        $window.json = response.data; //global json file
	        $scope.data = $window.json.page1;
	        $scope.repos = $window.json.page1.git.repos;
	    });
	}
	else
	{
		$scope.data = $window.json.page1;
		$scope.repos = $window.json.page1.git.repos;
	}

});
