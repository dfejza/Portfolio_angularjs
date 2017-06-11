// TODO this controller is reloaded in every page. make the reader have two controllers, one controller for the manga page selection,
//  and the other controller for the actual content. let the manga page selection remain static so we dont have to redo all these computations
angular.module('myApp').controller('mangaViewerController', function($scope, $state, $stateParams, $http, $window, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
      });
	}
	$scope.language = $window.selectedLanguage;

	$scope.data = {
		name : $stateParams.mangaId,
		volume : $stateParams.volume,
		pagenum : $stateParams.pagenum,
		pageCount : 100, //temp
		volumeCount : 1
	};

	// Key binds
	var handler = function(keyEvent) {
		//left arrow
	    if (keyEvent.which === 37)
	    {
	      prevPage = ($scope.data.pagenum > 1) ? $scope.data.pagenum-1 : 1; 
	      $state.go("mangaViewerPage", {mangaId : $scope.data.name, volume : $scope.data.volume,pagenum : prevPage});
	    }
	    //right arrow
	    if (keyEvent.which === 39)
	    {
	      nextPage = ($scope.data.pagenum < $scope.data.pageCount) ? $scope.data.pagenum+1 : $scope.data.pageCount; 
	      $state.go("mangaViewerPage", {mangaId : $scope.data.name, volume : $scope.data.volume,pagenum : nextPage});
	    }
	  }
	var $doc = angular.element(document);

	$doc.on('keydown', handler);
	$scope.$on('$destroy',function(){
	  $doc.off('keydown', handler);
	})

	// Used for page numbers
	$scope.range = function(n) {
		return new Array(n);
	};

	// Get the manga volume count and current volume page count
	angular.forEach($window.json.mangaDb, function(value, key){
		// Search the dictionary for the correct entry
		if(value.name == $scope.data.name)
		{
			$scope.data.pageCount = value.volumePageCountList[$scope.data.volume-1];
			$scope.data.volumeCount = value.volumeCount;	
		}
	});

	// Logic used to make the page list. Need to improve
	$scope.filteredTodos = []
	,$scope.currentPage = 1
	,$scope.numPerPage = 20
	,$scope.maxSize = 5;
	var begin = ($scope.data.pagenum - 10);
	if(begin<0)
		begin = 1;
	var end = begin + $scope.numPerPage;
	if(end > $scope.data.pageCount)
	{
		end = $scope.data.pageCount;
	}

	$scope.makeTodos = function() {
		$scope.todos = [];
		$scope.todosVolume = [];
		for (i=begin;i<=end;i++) {
			$scope.todos.push({ page: i});
		}
		for (i=1;i<=$scope.data.volumeCount;i++) {
			$scope.todosVolume.push({ volume: i});
		}
	};
	$scope.makeTodos(); 

	$scope.$watch("currentPage + numPerPage", function() {
		$scope.filteredTodos = $scope.todos;

		$scope.filteredTodosVolume = $scope.todosVolume;
	});

});