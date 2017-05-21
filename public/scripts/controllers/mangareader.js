
angular.module('myApp').controller('mangaController', function($scope, $http,loadjson) {
	$http({
		url : '/api/mangaList',
		method : 'GET',
	}).then(function successCallback(data){
		var temp = data.data;
		var temp = data.data;
	});
});