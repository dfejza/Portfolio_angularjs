angular.module('myApp').controller('NavController', function($scope, $http, $window, $state, loadjson) {
	$scope.languages = [{
		value: 0,
		label: 'English'
	}, {
		value: 1,
		label: '日本語'
	}];
	$scope.nav = [];

	$window.selectedLanguage = localStorage.getItem("selectedLanguage");
	if($window.selectedLanguage == null)
	{
		localStorage.setItem("selectedLanguage", 0);
		$window.selectedLanguage = 0;
	}
	$scope.langModel = parseInt($window.selectedLanguage);
	$scope.language = $scope.langModel;

	loadjson.getItems().then(function(response) { 
		$scope.loaded = true;
$window.json = response.data; //global json file
$scope.setNavLang();
});

	$scope.changeLanguage = function(){
		$window.selectedLanguage = $scope.langModel;
		localStorage.setItem("selectedLanguage", $scope.langModel);
		$scope.setNavLang();
		$state.reload();
	}

	$scope.setNavLang = function(){
		for(var key = 0; key < $window.json.navigation.length; key++)
		{
			$scope.nav[key]= $window.json.navigation[key][$scope.langModel];
		}
	}
});