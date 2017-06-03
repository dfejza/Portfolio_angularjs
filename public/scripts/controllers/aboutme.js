angular.module('myApp').controller('aboutmeController', function($scope, $window, $http, loadjson, sendFormService) {
  if($window.json==null){
    loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
          $scope.data = $window.json.page2;
        });
  }
  else
  {
    $scope.data = $window.json.page2;
  }
  $scope.language = $window.selectedLanguage;
  

  //form details
  $scope.formDetails = {
    name : "",
    email : "",
    message : ""
  }

  $scope.submitForm = function() {
    // Get the IP of the user
    $http({
      method: 'GET',
      url: '//freegeoip.net/json/'
    }).then(function successCallback(response) {
      // Get the date
      var d = new Date();

      var formInput = {
        date :  (d.getMonth()+1) + "/" + d.getDate() +"/" + d.getFullYear() + " @ " + d.getHours() + ":" + d.getMinutes(),
        ip : response.data.ip,
        name : $scope.formDetails.name,
        email : $scope.formDetails.email,
        message : $scope.formDetails.message
      };

      sendFormService.createPost(formInput)
      .then(function(response) {
        $scope.formDetails = {};
        $scope.$setPristine(true);
      });

    }, function errorCallback(response) {
      var d = new Date();

      var formInput = {
        date :  (d.getMonth()+1) + "/" + d.getDate() +"/" + d.getFullYear() + " @ " + d.getHours() + ":" + d.getMinutes(),
        ip : "adblocker used",
        name : $scope.formDetails.name,
        email : $scope.formDetails.email,
        message : $scope.formDetails.message
      };

      sendFormService.createPost(formInput)
      .then(function(response) {
        $scope.formDetails = {};
        $scope.$setPristine(true);
      });
    });
  }
});