angular.module('myApp').controller('loginController',  function($scope, $state, $stateParams, $http, $window, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
      });
	}
	$scope.formInput = {
		login : "",
		pass : ""
	}

	$scope.submit = function(){
		$http({
			url: "/login",
			method: "POST",
			data: JSON.stringify($scope.formInput)
		}).then(function successCallback(msg){
			if(msg.data !="NO")
			{
				$state.go("success",{passedData : msg});
			}
		});
	}
});