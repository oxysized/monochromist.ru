document.addEventListener("DOMContentLoaded", function () {
  var username = getCookie("username");
  var cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  console.log("Полученное значение cartCount из localStorage:", cartCount);

  if (username) {
    document.querySelector(".userLogin").innerHTML =
      '<div class="heart__count">' +
      '<span id="cartCount">' +
      cartCount +
      "</span>" +
      '<a href="html/favorite__cart.html" class="heart-link">' +
      '<img src="images/heart.png" alt="heart" class="heart">' +
      "</a>" +
      "</div>" +
      '<a href="html/shopping__cart.html"><img src="images/shopping__cart.png" class="shopping__cart"></a>' +
      '<a href="profile.php"><p>Welcome, ' +
      username +
      "!</p></a>";

    document.getElementById("cartCount").innerText = cartCount;
  }
});

function setCartCount(count) {
  localStorage.setItem("cartCount", count);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
