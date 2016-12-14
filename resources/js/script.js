var languageSelect = document.getElementById('LanguageSelect');
var selectedLanguage = readCookie('language');


// if ((selectedLanguage == 'english') ||
// (selectedLanguage == 'japanese')
// {
//   $(".language select").val(selectedLanguage);
//   var sel = $(".language select").val(selectedLanguage);
//   if (selectedLanguage == 'english') {
//     $(".english").css("display", "inline");
//     $(".japanese").css("display", "none");
//   } else if (selectedLanguage == 'japanese') {
//     $(".english").css("display", "none");
//     $(".japanese").css("display", "inline");
//   }
// }

$(".language select").bind('change', function() {
  //on change set cookie and...
  setCookie('language', this.value, 365);

  //change css depending on what is selected
  var sel = $(".language select").val();
  if (sel == 'english') {
    $('#languageText').text('Language:');
    // Change the JS object pointer to english

  } else if (sel == 'japanese') {
    $('#languageText').text('gengo:');
    // Change the JS object pointer to japanese

  }
});

function saveLanguage(cookieValue) {
  var sel = document.getElementById('LanguageSelect');
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
