document.querySelector("#signup-submit").onclick = function (event) {
  event.preventDefault();
  let name = document.querySelector("#signup-name").value;
  let pass = document.querySelector("#signup-pass").value;
  let email = document.querySelector("#signup-email").value;
  let surname = document.querySelector("#signup-surname").value;

  let data = {
    name: name,
    pass: pass,
    email: email,
    surname: surname,
  };

  ajax("../core/signup.php", "POST", signup, data);

  function signup(result) {
    console.log(result);
    if (result == 2) {
      alert("Заполните поля");
    } else if (result == 1) {
      alert("Успех. Теперь можно войти!");
    } else {
      alert("Ошибка, повторите регистрацию позже!");
    }
  }
};

document.querySelector("#login-submit").onclick = function (event) {
  event.preventDefault();
  let pass = document.querySelector("#login-pass").value;
  let email = document.querySelector("#login-email").value;

  let data = {
    pass: pass,
    email: email,
  };

  ajax("../core/login.php", "POST", login, data);

  function login(result) {
    if (result == 2) {
      alert("Заполните поля");
    } else if (result == 0) {
      alert("Пользователь не найден!");
    } else {
      console.log(result);
      result = JSON.parse(result);
      var d = new Date();
      d.setTime(d.getTime() + 10 * 60 * 1000);
      var expires = d.toUTCString();
      document.cookie = `email=${result.email}; expires=${expires}; path=/`;
      location.href = "../profile.php";
    }
  }
};

function textPwdS() {
  var x = document.getElementById("signup-pass");
  var seen = document.getElementById("eyeOS");
  var Nseen = document.getElementById("eyeSS");
  if (x.type === "password") {
    x.type = "text";
    seen.style.display = "flex";
    Nseen.style.display = "none";
  } else {
    x.type = "password";
    Nseen.style.display = "flex";
    seen.style.display = "none";
  }
}

function textPwdL() {
  var x = document.getElementById("login-pass");
  var seen = document.getElementById("eyeOL");
  var Nseen = document.getElementById("eyeSL");
  if (x.type === "password") {
    x.type = "text";
    seen.style.display = "flex";
    Nseen.style.display = "none";
  } else {
    x.type = "password";
    Nseen.style.display = "flex";
    seen.style.display = "none";
  }
}

var signupCont = document.getElementById("signupC");
var loginCont = document.getElementById("loginC");

function switchToLogin() {
  signupCont.style.display = "none";
  loginCont.style.display = "flex";
}

function switchToSignup() {
  loginCont.style.display = "none";
  signupCont.style.display = "flex";
}
