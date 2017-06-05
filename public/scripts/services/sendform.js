angular.module("myApp").service('sendFormService', function($http) {
	var service = {};
	service.createPost = function(model) {
		return $http({
			method: 'POST',
			url: '/sendtodb',
			data: angular.toJson(model)
		});
	}
	return service;
});