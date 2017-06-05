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


angular.module('myApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
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
  var successState = {
    name: 'success',
    url: '/success',
    templateUrl: '/views/table.html',
    controller: 'successController',
    params : { passedData: null}
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
  $stateProvider.state(successState);
  $urlRouterProvider.otherwise('/');
});