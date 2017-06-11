angular.module('myApp').controller('mangaController', function($scope, $http,$window, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
          $scope.mangaInfo = $window.json.mangaDb;
          $scope.data = $window.json.page6;
      });
	}
	else
	{
		$scope.data = $window.json.page6;
		$scope.mangaInfo = $window.json.mangaDb;
	}

	$scope.language = $window.selectedLanguage;
	$scope.condition = false;
	$scope.mangaInfo = $window.json.mangaDb;

});