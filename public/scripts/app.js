var selectedLanguage = 0;
var json = null;

angular.module('myApp', ['ui.router','ui.bootstrap', 'ngAnimate']);

//todo get from server
angular.module('myApp').factory('loadjson', function($http) {
  return {
    getItems: function () {
      return  $http.get('/assets/data/data.json');
    }
  }
});

angular.module('myApp').controller('NavController', function($scope, $http, $window, $state, loadjson) {
  $scope.languages = [{
    value: 0,
    label: 'English'
  }, {
    value: 1,
    label: '日本語'
  }];
  $scope.nav = [];

  $window.selectedLanguage = localStorage.getItem("selectedLanguage");
  if($window.selectedLanguage == null)
  {
    localStorage.setItem("selectedLanguage", 0);
    $window.selectedLanguage = 0;
  }
  $scope.langModel = parseInt($window.selectedLanguage);
  $scope.language = $scope.langModel;

  loadjson.getItems().then(function(response) { 
    $scope.loaded = true;
    $window.json = response.data; //global json file
    $scope.setNavLang();
  });

  $scope.changeLanguage = function(){
    $window.selectedLanguage = $scope.langModel;
    localStorage.setItem("selectedLanguage", $scope.langModel);
    $scope.setNavLang();
    $state.reload();
  }

  $scope.setNavLang = function(){
    for(var key = 0; key < $window.json.navigation.length; key++)
    {
      $scope.nav[key]= $window.json.navigation[key][$scope.langModel];
    }
  }
});



angular.module('myApp').config(function($stateProvider, $urlRouterProvider) {

  var homeState = {
    name: 'home',
    url: '/',
    templateUrl: '/views/home.html',
    controller: 'homeController'
  }
  var portfolioState = {
    name: 'portfolio',
    url: '/portfolio',
    templateUrl: '/views/portfolio.html',
    controller: 'portfolioController'
  }
  var aboutMeState = {
    name: 'aboutme',
    url: '/aboutme',
    templateUrl: '/views/aboutme.html',
    controller: 'aboutmeController'
  }
  var loginState = {
    name: 'login',
    url: '/login',
    templateUrl: '/views/login.html',
    controller: 'loginController'
  }
  var chatState = {
    name: 'chat',
    url: '/chat',
    templateUrl: '/views/chat.html',
    controller: 'chatController'
  }
  var mangaSelectionState = {
    name: 'mangaSelection',
    url: '/manga',
    templateUrl: '/views/mangaSelection.html',
    controller: 'mangaController'
  }
  var mangaViewer = {
    name: 'mangaViewer',
    url: '/manga/:mangaId',
    templateUrl: '/views/mangaViewer.html',
    controller: 'mangaViewerController'
  }
  var mangaViewerPage = {
    name: 'mangaViewerPage',
    url: '/manga/:mangaId/:volume/:pagenum',
    templateUrl: '/views/mangaViewer.html',
    controller: 'mangaViewerController'
  }

  $stateProvider.state(homeState);
  $stateProvider.state(portfolioState);
  $stateProvider.state(aboutMeState);
  $stateProvider.state(loginState);
  $stateProvider.state(chatState);
  $stateProvider.state(mangaSelectionState);
  $stateProvider.state(mangaViewer);
  $stateProvider.state(mangaViewerPage);
  $urlRouterProvider.otherwise('/');
});