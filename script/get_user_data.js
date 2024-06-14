document.addEventListener("DOMContentLoaded", function () {
  let userEmail = getCookie("email");

  ajax(
    "../core/get_user_data.php",
    "POST",
    function (result) {
      result = JSON.parse(result);
      document.querySelector("#signup-name").value = result.name;
      document.querySelector("#signup-pass").value = result.password;
      document.querySelector("#signup-surname").value = result.surname;
      document.querySelector("#signup-country").value = result.country;
      document.querySelector("#signup-city").value = result.city;
      document.querySelector("#signup-postcode").value = result.postcode;
      document.querySelector("#signup-address").value = result.address;
    },
    { email: userEmail }
  );

  document.querySelector("#signup-submit").onclick = function (event) {
    event.preventDefault();
    let updateData = {
      email: userEmail,
      name: document.querySelector("#signup-name").value,
      pass: document.querySelector("#signup-pass").value,
      surname: document.querySelector("#signup-surname").value,
      country: document.querySelector("#signup-country").value,
      city: document.querySelector("#signup-city").value,
      postcode: document.querySelector("#signup-postcode").value,
      address: document.querySelector("#signup-address").value,
    };
    ajax(
      "../core/update_user_data.php",
      "POST",
      function (result) {
        if (result == 1) {
          alert("Данные успешно обновлены!");
          setCookie("username", updateData.name, 365);
          updateHeader(updateData.name);
          window.location.href = "../index.html";
        } else {
          alert("Ошибка обновления");
        }
      },
      updateData
    );
  };
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

function updateHeader(username) {
  var cartCount = getCookie("cartCount");
  document.querySelector(".userLogin").innerHTML =
    '<div class="heart__count">' +
    '<a href="/html/favorite__cart.html" class="heart-link">' +
    '<img src="../images/heart.png" alt="heart" class="heart">' +
    "</a>" +
    '<span id="cartCount">' +
    cartCount +
    "</span>" +
    "</div>" +
    '<a href="../html/shopping__cart.html"><img src="../images/shopping__cart.png" class="shopping__cart"></a>' +
    '<a href="../profile.php"><p>Welcome, ' +
    username +
    "!</p></a>";
}
