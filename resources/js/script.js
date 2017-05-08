var langaugeCookie = readCookie('language');
var selectedLanguage;
var currentPage = "page0";
var gitRepouri = 'https://api.github.com/users/dfejza';
var bitbucketRepouri = "https://api.bitbucket.org/2.0/users/dfejza";
var bitbucketRepouriRepo = "https://api.bitbucket.org/2.0/repositories/dfejza";
var json;
language = {
  ENGLISH : 0,
  JAPANESE : 1
}

// Startup function
$(document).ready(function(){

  $.getJSON("/resources/data/data.json", function(result){
    json = result;
  })
  .done( function() {
      //Load the cookies, remembering the last user seetting
      if(langaugeCookie== 'english')
      {
        $('#langSelect').val('english');
        selectedLanguage = language.ENGLISH;
        loadPage(currentPage);
      }
      else if(langaugeCookie== 'japanese')
      {
        $('#langSelect').val('japanese');
        selectedLanguage = language.JAPANESE;
        loadPage(currentPage);
      }
      else
      {
        selectedLanguage = language.ENGLISH;
        loadPage(currentPage)
      }
    });



  // Change text of the language select based off user lanuage
  $('#langSelect').on('change', function() {

    //on change set cookie and...
    setCookie('language', this.value, 365);

    var sel = $('#langSelect').val();

    if (sel == 'english') {
      selectedLanguage = language.ENGLISH;
      // Change the JS object pointer to english
      loadPage(currentPage);

    } else if (sel == 'japanese') {
      selectedLanguage = language.JAPANESE;
      // Change the JS object pointer to japanese
      loadPage(currentPage);

    }
  });

  // Click listener for the page selection
  $('ul').on('click', 'li.fake-link', function(){
    loadPage(this.id);
  });

});

// No matter the page, the header should remain the same
function formatPageHeader() {
  // Cycle through the navigation bar and change the language
  $('.navigationPages li').each(function(i,e){
    $(e).text(json.navigation[i][selectedLanguage]);
  });

}

// Make everything dynamic.
// Parse the json file and enumerate the page based off it's specs
function loadPage(pageNum){
  // remove the selected class
  $('#'+ currentPage).removeClass('active');
  // Show which page is selected by adding the css to the pageselection
  $('#'+ pageNum).last().addClass('active');
  
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
}

function formatPageHome(){
  // Lets load the specified page into body
  $("#main").load("home.html", function(){
    // Load the specifics of each ID from the JSON
    $("#name").append(json.page0.name[selectedLanguage]);
    $("#jobTitle").append(json.page0.jobTitle[selectedLanguage]);
    $("#goalsTitle").append(json.page0.goalsTitle[selectedLanguage]);
    // Loop through the array of goals
    $.each(json.page0.goals,function(i,e){
      $("#goals").append("<li>" + e[selectedLanguage] + "</li>");
    });

  });
}

// Override to format the portfolio page
// Exercises GET
function formatPagePortfoilio(){

  $("#main").load("portfolio.html", function(){
    // Create a template using mustache
    var template = $("#projTemplate").html();    // Template for git proj

    // Fetch the GIT user details
    var icon;
    requestJSON( gitRepouri ,function(retunData)
    {
      //From the home API call lets store the icon, following and followers, and # of repos
      icon = retunData.avatar_url;
      var followers = retunData.followers;
      var following = retunData.following;
      var username = retunData.login;
      var usernameLink = retunData.html_url;
      var repoCount = retunData.public_repos;

      // Format the HTML according to the JSONs
      $('.portfolioHeader1 #username').append(username);
      $('.portfolioHeader1 #username').attr('href', usernameLink);
      $('.portfolioHeader1 #imgLink1').attr('href', usernameLink);
      $('.portfolioHeader1 #repoCount').append(json.page1.repoCount[selectedLanguage] + " : " + repoCount);
      $('.portfolioHeader1 #followers').append(json.page1.followers[selectedLanguage] + " : " + followers);
      $('.portfolioHeader1 #following').append(json.page1.following[selectedLanguage] + " : " + following);

    });

    // Fetch the Bit Bucket user details
    requestJSONP( bitbucketRepouri ,function(retunData)
    {
      //From the home API call lets store the icon, following and followers, and # of repos
      var followers = "NA";
      var following = "NA";
      var username = retunData.username;
      var usernameLink = "https://bitbucket.org/dfejza/";
      var repoCount = "2";

      // Format the HTML according to the JSONs
      $('.portfolioHeader2 #username').append(username);
      $('.portfolioHeader2 #username').attr('href', usernameLink);
      $('.portfolioHeader2 #imgLink1').attr('href', usernameLink);
      $('.portfolioHeader2 #repoCount').append(json.page1.repoCount[selectedLanguage] + " : " + repoCount);
      $('.portfolioHeader2 #followers').append(json.page1.followers[selectedLanguage] + " : " + followers);
      $('.portfolioHeader2 #following').append(json.page1.following[selectedLanguage] + " : " + following);

    });

    // Fetch each project GITHUB
    requestJSON( (gitRepouri+"/repos") ,function(retunData)
    {
      // Iterate through the array returned
      $.each(retunData, function(key, data){
        // Fill in template
        var view = { name:        data.name,
                     link:        data.html_url,
                     image:       icon,
                     fullname:    data.full_name,
                     description: data.description};

        // Create specialized object
        var rendered = Mustache.render(template, view);

        // Add the object
        $("#projects").append(rendered);
      });
    });


        // Fetch each project BITBUCKET
    requestJSONP(bitbucketRepouriRepo ,function(retunData)
    {
      // Iterate through the array returned
      $.each(retunData.values, function(key, data){
        // Fill in template
        var view = { name:        data.name,
                     link:        data.html_url,
                     image:       icon,
                     fullname:    data.full_name,
                     description: data.slug};

        // Create specialized object
        var rendered = Mustache.render(template, view);

        // Add the object
        $("#projects").append(rendered);
      });
    });

  });
}

// GET json
function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}
// GET jsonp (cross domain)
function requestJSONP(url, callback) {
  $.ajax({
    url: url,
    dataType: 'jsonp',
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}


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
