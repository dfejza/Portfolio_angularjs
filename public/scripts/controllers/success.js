angular.module("myApp").controller('successController', function($scope, $state) {
	$scope.tableData = $state.params.passedData.data;
});