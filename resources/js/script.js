var langaugeCookie = readCookie('language');
var selectedLanguage;
var currentPage = "page0";
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

// Function used to change the lanuage of the website.
// Called when the selection from
function formatPage() {
  //First lets remove the old page
  //TODO

  //Change the text found on the language selection
  $('#languageText').text(json.selectorText[selectedLanguage]);

  // Cycle through the navigation bar and change the language
  $('.navigation li').each(function(i,e){
    $(e).text(json.navigation[i][selectedLanguage]);
  });

      // // Change the contents of the body by redrawing
      // // First remove
      // $('.dynamic').each(function(i,e){
      //   $(e).remove();
      // });
      // // Next redraw
      // $.each(json[currentPage], function(i,e){
      //   $('body').append(e[selectedLanguage]);
      // });
      // $('.dynamic').addClass('animated bounceinleft');
    }

// Make everything dynamic.
// Parse the json file and enumerate the page based off it's specs
function loadPage(pageNum){
  currentPage = pageNum;
  formatPage();
  // // Provide an override for unique pages
  // // Homepage Feature removed. Output looks clunky
  if(currentPage=='page0')
    formatPageHome();
  if(currentPage=='page1')
    formatPagePortfoilio();

  // // $.each(json[pageNum], function(i,e){
  // //   $('body').append(e.text[selectedLanguage]);
  // // });
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
    // Fetch
    homeurl = 'https://api.github.com/users/dfejza';
    repouri = 'https://api.github.com/users/dfejza/repos';
    requestJSON( homeurl ,function(json)
    {
      // Function returned from the call
      // Check if valid
      if(json.message == "Not Found" || username == '') {
        $('body').html("<h2>No User Info Found</h2>");
      }
      else {
          // else we have a user and we display their info
          var fullname   = json.name;
          var username   = json.login;
          var aviurl     = json.avatar_url;
          var profileurl = json.html_url;
          var location   = json.location;
          var followersnum = json.followers;
          var followingnum = json.following;
          var reposnum     = json.public_repos;

          if(fullname == undefined) { fullname = username; }

          var outhtml = '<h2> <span class="content_title">'+fullname+' </span> <span class="content_name">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
          outhtml = outhtml + '<div class="content_body"><div class="content_pic"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="120" height="120" alt="'+username+'"></a></div>';
          if(selectedLanguage == language.ENGLISH)
            outhtml = outhtml + '<p>Followers: '+followersnum+'<br>Following: '+followingnum+'<br>Repos: '+reposnum+'</p><br><br><br></div>';
          else
            outhtml = outhtml + '<p>フォロワー: '+followersnum+'<br>フォロー: '+followingnum+'<br>リポジトリ: '+reposnum+'</p><br><br><br></div>';
          outhtml = outhtml + '<div class="content_repos">';

          var repositories;
          $.getJSON(repouri, function(json){
            repositories = json;   
            outputPageContent();                
          });          
          
          function outputPageContent() {
            if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
            else {
              if(selectedLanguage == language.ENGLISH)
                outhtml = outhtml + '<p><span class="content_repotitle"><strong>Repos List:</strong></p></span>';
              else
                outhtml = outhtml + '<p><span class="content_repotitle"><strong>リポジトリ リスト:</strong></p></span>';

              $.each(repositories, function(index) {
                outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
              });
              outhtml = outhtml + '</div>'; 
            }
            $('#portfolio').append(outhtml);
          } // end outputPageContent()
        } // end else statement
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
