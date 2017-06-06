angular.module('myApp').directive('snakegameDirective', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            //$(element).'pluginActivationFunction'(scope.$eval(attrs.directiveName));
        }
    };
});