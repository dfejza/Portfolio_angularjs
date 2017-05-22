var langaugeCookie = readCookie('language');
var selectedLanguage;
var currentPage = "page0";
var json = null;
var pageCount;
var interval = null;
language = {
  ENGLISH : 0,
  JAPANESE : 1
}

angular.module('myApp', ['ui.router','ui.bootstrap', 'ngAnimate']);

//todo get from server
angular.module('myApp').factory('loadjson', function($http) {
  return {
    getItems: function () {
      return  $http.get('/assets/data/data.json');
    }
  }
});
angular.module('myApp').controller('NavController', function($scope, $http, $window, loadjson) {
  loadjson.getItems().then(function(response) { 
    $scope.nav = response.data.navigation;
    $window.json = response.data; //global json file
  });
});



angular.module('myApp').config(function($stateProvider, $urlRouterProvider) {

  var homeState = {
    name: 'home',
    url: '/',
    templateUrl: '/views/mainENG.html',
    controller: 'NavController'
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


// // Startup function ==================================================
// $(document).ready(function(){

//   $.getJSON("./resources/data/data.json", function(result){
//     json = result;
//   })
//   .done( function() {
//       //Load the cookies, remembering the last user seetting
//       if(langaugeCookie== 'english')
//       {
//         $('#langSelect').val('english');
//         selectedLanguage = language.ENGLISH;
//         loadPage(currentPage);
//       }
//       else if(langaugeCookie== 'japanese')
//       {
//         $('#langSelect').val('japanese');
//         selectedLanguage = language.JAPANESE;
//         loadPage(currentPage);
//       }
//       else
//       {
//         selectedLanguage = language.ENGLISH;
//         loadPage(currentPage)
//       }
//     });

//   $("#main").on("click", '.btn.login', function (e) {
//     formInput = {
//       login : $("#email").val(),
//       pass : $("#pwd").val()
//     }

//     $.ajax({
//       url: "/login",
//       type: "POST",
//       data: JSON.stringify(formInput),
//       contentType: "application/json"
//     }).done(function( msg ) {
//       console.log(msg);
//       if(msg !="NO")
//       {
//         formatData(msg);
//       }
//       else
//       {
//         loadPage("page0");
//         alert("Invalid login");
//       }
//     });
//   });


//   // ===Chat callbacks==================================================
//   $("#main").on('keyup', "#msg", function (e) {
//     if (e.keyCode == 13) {
//       $(".btn#sendchat").click();
//     }
//   });

//   $("#main").on("click", ".btn#sendchat", function(e){
//     var d = new Date();
//     formInput = {
//       time : (d.getHours() + ":" + d.getMinutes()),
//       id : $("#user").val(),
//       msg : $("#msg").val()
//     }
//     $.ajax({
//       url: "/insertchat",
//       type: "POST",
//       data: JSON.stringify(formInput),
//       contentType: "application/json"
//     }).done(function( msg ) {
//       // clear msg box
//     });
//     $("#msg").val("");
//   });

//   $("#main").on("click", ".btn#clearChat", function(e){
//     $.ajax({
//       url: "/clearchat",
//       type: "POST",
//       data: null,
//       contentType: "application/json"
//     }).done(function( msg ) {
//         //do nothing for now
//       });
//   });

//   // Manga book callback ==================================================
//   $("#main").on("click", ".mangaselection", function(e){
//     pageCount = 1;
//     loadManga(this.hash.substr(1));
//   });

//   $("#main").on("click", ".mangapagereader", function(e){
//     console.log(e);
//     var $this = $(this);
//     var x = e.offsetX;
//     var width = $(this).width();


//     if ( x<= width/2 && pageCount>1 ) {
//       pageCount--;
//       $(this).attr('src', "/resources/data/manga/" + $(this).attr("alt") + "/volume1/y " + "("+pageCount+").jpg");
//     }
//     if ( x > (width/2)) {
//       pageCount++;
//       $(this).attr('src', "/resources/data/manga/" + $(this).attr("alt") + "/volume1/y " + "("+pageCount+").jpg");
//     }  
//   });

//   //##### send add record Ajax request to response.php ######### =============
//   $("#main").on("click", '#FormSubmit.btn', function (e) {
//     e.preventDefault();
//     if($("#comments").val()==='')
//     {
//       alert("Please enter some text!");
//       return false;
//     }
//     // Get the IP of the user
//     $.getJSON('freegeoip.net/json/?callback=?', function(data) {

//       // Get the date
//       var d = new Date();

//       var formInput = {
//         date :  (d.getMonth()+1) + "/" + d.getDate() +"/" + d.getFullYear() + " @ " + d.getHours() + ":" + d.getMinutes(),
//         ip : data.ip,
//         name : $("#name").val(),
//         email : $("#email").val(),
//         message : $("#comments").val()
//       };

//       $.ajax({
//         url: "/sendtodb",
//         type: "POST",
//         data: JSON.stringify(formInput),
//         contentType: "application/json"
//       }).done(function( msg ) {
//         console.log(msg);
//       });
//     });


//   $("#FormSubmit").hide(); //hide submit button
//   $("#LoadingImage").show(); //show loading image

// });

//   // Change text of the language select based off user lanuage
//   $('#langSelect').on('change', function() {

//     //on change set cookie and...
//     setCookie('language', this.value, 365);

//     var sel = $('#langSelect').val();

//     if (sel == 'english') {
//       selectedLanguage = language.ENGLISH;
//       // Change the JS object pointer to english
//       loadPage(currentPage);

//     } else if (sel == 'japanese') {
//       selectedLanguage = language.JAPANESE;
//       // Change the JS object pointer to japanese
//       loadPage(currentPage);

//     }
//   });

//   // Click listener for the page selection
//   $('.nav').on('click', 'li.navbar', function(){
//     loadPage(this.id);
//   });

// });

// No matter the page, the header should remain the same
function formatPageHeader() {
  // Cycle through the navigation bar and change the language
  $('.nav li').each(function(i,e){
    $("#page"+i).html("<a>" + json.navigation[i][selectedLanguage] + "</a>");
  });

}

// Make everything dynamic.
// Parse the json file and enumerate the page based off it's specs
function loadPage(pageNum){ 
  // remove the selected class
  $('#'+ currentPage).removeClass('active');
  // Show which page is selected by adding the css to the pageselection
  $('#'+ pageNum).last().addClass('active');

  //Check for chat interval. Remove if is
  if(interval != null)
  {
    clearInterval(interval);
  }

  // Global var keeping track of the page we are on
  currentPage = pageNum;

  // Set the language
  formatPageHeader();

  // Check which page. Goto specified formatting function
  if(currentPage=='page0'){
    formatPageHome();
  }
  if(currentPage=='page1'){
    formatPagePortfoilio();
  }
  if(currentPage=='page2'){
    formatAboutMe();
  }
  if(currentPage=='page3'){
    formatLogin();
  }
  if(currentPage=='page4'){
    formatChat();
  }
  if(currentPage=='page5'){
    formatManga();
  }
}

function formatPageHome(){
  // Lets load the specified page into body
  $("#main").load(json.page0.contentRaw[selectedLanguage], function(){
  });
}

// Override to format the portfolio page
// Exercises GET
// TODO make a popover on more details for each git project
function formatPagePortfoilio(){

  $("#main").load("portfolio.html", function(){
    // Create a templateUrl using mustache
    var collapseCounter = 1; //bootstrap variable needs a number suffixed to the ID. Since eat repo is generated, we need to track the count
    var templateUrl = $("#projtemplateUrl").html();    // templateUrl for git proj

    $('#repoHeader').append(json.page2.repoHeader[selectedLanguage]);

    // Format the HTML according to the JSON's Git User
    $('.portfolioHeader1 #username').append(json.page3.git.username);
    $('.portfolioHeader1 #username').attr('href', json.page3.git.usernameLink);
    $('.portfolioHeader1 #imgLink1').attr('href', json.page3.git.usernameLink);
    $('.portfolioHeader1 #repoCount').append(json.page1.repoCount[selectedLanguage] + " : " + json.page3.git.repoCount);
    $('.portfolioHeader1 #followers').append(json.page1.followers[selectedLanguage] + " : " + json.page3.git.followers);
    $('.portfolioHeader1 #following').append(json.page1.following[selectedLanguage] + " : " + json.page3.git.following);

    // Format the HTML according to the JSON's Bit Bucket User
    $('.portfolioHeader2 #username').append(json.page3.bitB.username);
    $('.portfolioHeader2 #username').attr('href', json.page3.bitB.usernameLink);
    $('.portfolioHeader2 #imgLink1').attr('href', json.page3.bitB.usernameLink);
    $('.portfolioHeader2 #repoCount').append(json.page1.repoCount[selectedLanguage] + " : " + json.page3.bitB.repoCount);
    $('.portfolioHeader2 #followers').append(json.page1.followers[selectedLanguage] + " : " + json.page3.bitB.followers);
    $('.portfolioHeader2 #following').append(json.page1.following[selectedLanguage] + " : " + json.page3.bitB.following);

    // Fetch each project GITHUB
    // Format the HTML according to the JSON's Git's repos
    $.each(json.page3.git.repos, function(key, data){
      // Fill in templateUrl
      var view = { name:        data.name,
       link:        data.link,
       image:       data.image,
       fullname:    data.name,
       description: data.description,
       collapseId:  "collapse" + collapseCounter,
       collapseIdHref:  "#collapse" + collapseCounter};

      // Create specialized object
      var rendered = Mustache.render(templateUrl, view);

      // Add the object
      $("#projects").append(rendered);
      collapseCounter++;
    });http://www.screentogif.com/screenshots/Editor-Empty.png

    // Cleanup work due to being generated genericaly
    // Need to add the class 'in' to the first element, in order for the accordian effect to work
    $ ("#collapse1.panel-collapse").addClass("in");
  });
}

function formatAboutMe(){
  // Lets load the specified page into body
  $("#main").load("aboutme.html", function(){
    $("#name").append(json.page3.name[selectedLanguage]);
    $("#summary").append(json.page3.summary[selectedLanguage]);
    $.each(json.page3.glyphicons, function(key,data){
      $("#glyphicon"+key).append(data[selectedLanguage]);
    });
    $("#languageheader").append(json.page3.languageheader[selectedLanguage]);
    $("#contactheader").append(json.page3.contact.header[selectedLanguage]);
    $("#contactquestion").append(json.page3.contact.question[selectedLanguage]);
    $("#contactname").attr('placeholder', json.page3.contact.name[selectedLanguage]);
    $("#contactemail").attr('placeholder', json.page3.contact.email[selectedLanguage]);
    $("#contactcomment").attr('placeholder', json.page3.contact.comment[selectedLanguage]);
    $("#FormSubmit").append(json.page3.contact.FormSubmit[selectedLanguage]);
  });
}

function formatLogin(){
  // Lets view a chart
  $("#main").load("login.html", function(){

  });
}

function formatData(obj){
  // Lets view a chart
  $("#main").load("table.html", function(){
    //create the templateUrls
    var templateUrl = $("#tabletemplateUrl").html();

    //Fetch the table
    $.each(obj, function(key,rowData){
      var view = { ip: rowData.ip,
        date: rowData.date,
        name: rowData.name,
        email: rowData.email,
        message: rowData.message};

      // Create specialized object
      var rendered = Mustache.render(templateUrl, view);

      // Add the object
      $("#tableBody").append(rendered);
    });
  });
}

function formatChat(){
  $("#main").load("/chat.html", function(){
    // update the chatbox every second
    updateChat($('#convobox'));
    interval = setInterval(function(){
        updateChat($('#convobox')) // this will run after every 5 seconds
      }, 2500);
  });
}

function formatManga(){
  $("#main").load("/mangaSelection.html", function(){
    $("#header").append(json.page6.header[selectedLanguage]);
    $("#manga0").append(json.page6.selection[0][selectedLanguage]);
    $("#manga1").append(json.page6.selection[1][selectedLanguage]);
    $("#manga2").append(json.page6.selection[2][selectedLanguage]);
  });
}

function loadManga(mangaHash){
  $("#mangaBody").load("/mangatemplateUrl.html", function(){
    $("#mangapage").attr('alt', mangaHash);
    $("#mangapage").attr('src', "/resources/data/manga/" + mangaHash + "/volume1/y " + "("+pageCount+").jpg");
  });
}

//todo terrible implementation
function updateChat(chatbox){
  var temp = "";
  // //clear the chat
  // chatbox.empty();
  //update it
  $.getJSON('/updatechat', function(data) {
    $.each(data, function(key,rowData){
      var line = rowData.time + " - " + rowData.id + " : " + rowData.msg + "\n";
      //chatbox.val(chatbox.val()+line); 
      temp += (rowData.time +' <b>'+rowData.id + ':</b> ' + rowData.msg + '<br>');
    });
    if(temp != chatbox.html())
    {
      var testva = chatbox.html();
      chatbox.empty();
      chatbox.append(temp);
    }
    chatbox.scrollTop(chatbox[0].scrollHeight);
  });
}


// Remember the previous language selection and store in cookies
function saveLanguage(cookieValue) {
  var sel = document.getElementById('langSelect');
  setCookie('language', cookieValue, 365);
}

function setCookie(cookieName, cookieValue, nDays) {
  var today = new Date();
  var expire = new Date();

  if (nDays == null || nDays == 0)
    nDays = 1;

  expire.setTime(today.getTime() + 3600000 * 24 * nDays);
  document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
