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
      formatPage();
    }
    else if(langaugeCookie== 'japanese')
    {
      $('#langSelect').val('japanese');
      selectedLanguage = language.JAPANESE;
      formatPage();
    }
    else
    {
      selectedLanguage = language.ENGLISH;
      formatPage();
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
      formatPage();

    } else if (sel == 'japanese') {
      selectedLanguage = language.JAPANESE;
      // Change the JS object pointer to japanese
      formatPage();

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
      // Change the text found on the language selection
      //$('#languageText').text(json.selectorText[selectedLanguage]);

      // Cycle through the navigation bar and change the language
      $('.navigation li').each(function(i,e){
        $(e).text(json.navigation[i][selectedLanguage]);
      });

      // Change the contents of the body by redrawing
      // First remove
      $('.dynamic').each(function(i,e){
        $(e).remove();
      });
      // Next redraw
      $.each(json[currentPage], function(i,e){
        $('body').append(e[selectedLanguage]);
      });
      $('.dynamic').addClass('animated bounceinleft');
}

// Make everything dynamic.
// Parse the json file and enumerate the page based off it's specs
function loadPage(pageNum){
  currentPage = pageNum;
  formatPage();
  // $.each(json[pageNum], function(i,e){
  //   $('body').append(e.text[selectedLanguage]);
  // });
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
