var selectedLanguage = readCookie('language');
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
  // Wait for the asynchronus call to finish, or else the language contents are unknown
  .done( function() {
      //Load the cookies, remembering the last user setting
    if(selectedLanguage== 'english')
    {
      $('#langSelect').val('english');
      formatLanguage(language.ENGLISH);
    }
    if(selectedLanguage== 'japanese')
    {
      $('#langSelect').val('japanese');
      formatLanguage(language.JAPANESE);
    }
  });



  // Change text of the language select based off user lanuage
  $('#langSelect').on('change', function() {

    //on change set cookie and...
    setCookie('language', this.value, 365);

    var sel = $('#langSelect').val();

    if (sel == 'english') {

      // Change the JS object pointer to english
      formatLanguage(language.ENGLISH);

    } else if (sel == 'japanese') {

      // Change the JS object pointer to japanese
      formatLanguage(language.JAPANESE);

    }
  });

});

// Function used to change the lanuage of the website.
// Called when the selection from
function formatLanguage(languageIndex) {
      // Change the text found on the language selection
      $('#languageText').text(json.selectorText[languageIndex]);

      // Cycle through the navigation bar and change the language
      $('.navigation li').each(function(i,e){
        $(e).text(json.navigation[i][languageIndex]);
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
