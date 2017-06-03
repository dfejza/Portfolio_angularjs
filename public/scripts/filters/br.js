// filters js
angular.module('myApp').filter("nl2br", function($filter) {
	return function(data) {
		if (!data) return data;
		return data.replace(/\n\r?/g, '<br />');
	};
});