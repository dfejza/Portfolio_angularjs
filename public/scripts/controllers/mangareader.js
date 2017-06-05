angular.module('myApp').controller('mangaController', function($scope, $http,$window, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
          $scope.data = $window.json.page6;
      });
	}
	else
	{
		$scope.data = $window.json.page6;
	}
	$scope.language = $window.selectedLanguage;
	$scope.condition = false;

	$http({
		url : '/api/getMangaList',
		method : 'GET'
	}).then(function successCallback(data){
		$scope.mangaInfo = data.data;
		$scope.condition = true;
	});
});