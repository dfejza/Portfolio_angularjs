angular.module('myApp').controller('mangaViewerController', function($scope, $route, $routeParams, $http, $window, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
      });
	}

	$scope.data = {
		name : $routeParams.mangaId,
		volume : 1
	};

	if(typeof $routeParams.pagenum === 'undefined' || $routeParams.pagenum === null)
	{
		$scope.data.pagenum=1;
	}
	else
	{
		$scope.data.pagenum = parseInt($routeParams.pagenum) + 1; //s
	}
});