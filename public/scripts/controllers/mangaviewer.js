angular.module('myApp').controller('mangaViewerController', function($scope, $stateParams, $http, $window, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
      });
	}
	if($window.mangaInfo==null){
		$http({
			url : '/api/getMangaList',
			method : 'GET'
		}).then(function successCallback(data){
			$window.mangaInfo = data.data;

		});
	}


	$scope.language = $window.selectedLanguage;

	$scope.data = {
		name : $stateParams.mangaId,
		volume : $stateParams.volume,
		pagenum : $stateParams.pagenum
	};

	// Used for page numbers
	$scope.range = function(n) {
		return new Array(n);
	};



	$scope.filteredTodos = []
	,$scope.currentPage = 1
	,$scope.numPerPage = 20
	,$scope.maxSize = 5;

	$scope.makeTodos = function() {
		$scope.todos = [];
		for (i=1;i<=200;i++) {
			$scope.todos.push({ page: i});
		}
	};
	$scope.makeTodos(); 

	$scope.$watch("currentPage + numPerPage", function() {
		var begin = ($scope.data.pagenum - 10);
		if(begin<0)
			begin = 0;

		var end = begin + $scope.numPerPage;



		$scope.filteredTodos = $scope.todos.slice(begin, end);
	});

});