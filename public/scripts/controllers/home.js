angular.module('myApp').controller('homeController', function($scope, $window, $http, $sce, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
          $scope.content = response.data.page0.contentRaw;
      });
	}
	else
	{
		$scope.content = $window.json.page0.contentRaw;
	}
	$scope.language = $window.selectedLanguage;

	$scope.deliberatelyTrustDangerousSnippet = function() {
		return $sce.trustAsHtml($scope.content[$scope.language]);
	};
});