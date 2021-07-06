function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    'max-age': 999999,
    ...options
  };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}
const lang = navigator.languages
  ? navigator.languages[0]
  : (navigator.language || navigator.userLanguage)
const langWasDetected = getCookie('langWasDetected')
if (langWasDetected !== '1' && lang !== 'ru' && !(window.location.pathname === '/en' || window.location.pathname === '/en/')) {
  setCookie('langWasDetected', '1')
  window.location.href = '/en'
}
document.querySelector("body").onscroll = () => {
  const contacts = document.querySelector(".contacts")
  if (contacts.classList.contains("floaty")) {
    const content = document.querySelector(".contacts .content")
    if (contacts.getBoundingClientRect().top < 40) {
      if (!content.classList.contains("fixed")) {
        content.classList.add("fixed")
      }
    } else if (content.classList.contains("fixed")) {
      if (content.classList.contains("fixed")) {
        content.classList.remove("fixed")
      }
    }
  }
};
window.addEventListener( "load", function () {
  function sendData() {
    const XHR = new XMLHttpRequest();
    XHR.addEventListener("load", function(event) {
      input.value = ''
      alert('Скоро перезвоню. Спасибо за заявку!');
    });
    XHR.addEventListener( "error", function( event) {
      alert('Произошла ошибка. Позвоните сами, пожалуйста.');
    });
    XHR.open("POST", "https://api.binking.io/sd");
    XHR.setRequestHeader("Content-type", "application/json");
    XHR.send(JSON.stringify({phone: input.value}));
  }
  const form = document.getElementById("form");
  const input = document.getElementById("phone-input");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!input.value) {
      alert('Укажите номер телефона, пожалуйста');
      return
    }
    sendData();
  });
});
