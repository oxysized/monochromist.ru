document.querySelector("#logout").onclick = function () {
  var c = document.cookie;
  console.log(c);
  var d = new Date();
  d.setTime(d.getTime() - 10 * 60 * 1000);
  var expires = d.toUTCString();

  document.cookie = `email=; expires=${expires}; path=/`;
  document.cookie = `username=; expires=${expires}; path=/`;

  localStorage.clear();

  location.reload();
};
