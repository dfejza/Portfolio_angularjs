angular.module('myApp').controller('mangaViewerController', function($scope, $stateParams, $http, $window, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
      });
	}

	$scope.data = {
		name : $stateParams.mangaId,
		volume : 1
	};

	if(typeof $stateParams.pagenum === 'undefined' || $stateParams.pagenum === null)
	{
		$scope.data.pagenum=1;
	}
	else
	{
		$scope.data.pagenum = parseInt($stateParams.pagenum) + 1; //s
	}
});