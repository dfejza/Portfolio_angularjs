angular.module('myApp').controller('chatController', function($scope, $window, $http, $sce, $interval, loadjson) {
  if($window.json==null){
    loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
        });
  }

  //form details
  $scope.formDetails = {
    id : "",
    msg : ""
  }

  $scope.submitMessage = function () {
    var d = new Date();
    $scope.formDetails.time = (d.getHours() + ":" + d.getMinutes());
    $http({
      url: "/insertchat",
      method: "POST",
      data: JSON.stringify($scope.formDetails)
    }).then(function successCallback( msg ) {
    });

    $scope.updateChat();
    $scope.formDetails.msg = '';
  }

  $scope.myFunct = function(keyEvent) {
    if (keyEvent.which === 13)
      $scope.submitMessage();
  }

  $scope.clearChat = function() {
    $http({
      url : "/clearchat",
      method : "POST"
    })
  }

  // The chat insertion is html format. Need to make the HTML text 'safe'
  $scope.deliberatelyTrustDangerousSnippet = function() {
   return $sce.trustAsHtml($scope.chatbox);
 };

  // Update the contents of the chat based off the database
  $scope.updateChat = function() {
    //update it
    $http({
      url : '/updatechat',
      method : 'GET',
    }).then(function successCallback(data){
      var temp = "";
      $.each(data.data, function(key,rowData){
        var line = rowData.time + " - " + rowData.id + " : " + rowData.msg + "\n";
        temp += (rowData.time +' <b>'+rowData.id + ':</b> ' + rowData.msg + '<br>');
      });
      if(temp != $scope.chatbox)
      {
        $scope.chatbox = temp;
        $scope.deliberatelyTrustDangerousSnippet();
      }
      //chatbox.scrollTop(chatbox[0].scrollHeight);
    });
  };

  $scope.useInterval = function() {
    //Call update once a section
    $scope.intervalPromise = $interval($scope.updateChat, 3000);
  };

    // Remove the interval on page reload
    $scope.$on('$destroy',function(){
      if($scope.intervalPromise)
        $interval.cancel($scope.intervalPromise);   
    });

  });