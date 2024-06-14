<?php

    if ( !isset($_COOKIE['email']) OR trim($_COOKIE['email']) ==''){
        header("Location: index.html");
        exit; 
    }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/profile.css"/>
    <link rel="icon" href="images/logo.png">
    <title>MONOCHROMIST</title>
  </head>
  <body>
  <header class="header">
      <div class="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label class="menu__btn" for="menu__toggle">
          <span></span>
        </label>
        <ul class="menu__box">
          <li><a class="menu__item" href="html/clothing__store.html">SHOP</a></li>
          <li><a class="menu__item" href="html/delivery__things.html">DELIVERY</a></li>
          <li><a class="menu__item" href="html/payment__methods.html">PAYMENT</a></li>
          <li><a class="menu__item" href="html/about__company.html">ABOUT US</a></li>
          <li><p class="menu__item">© 2024 MONOCHROMIST</p></li>
        </ul>
      </div>
      <div class="logo">
        <p><a href="index.html">MONOCHROMIST</a></p>
      </div>
      <div class="userLogin" id="username">
              <?php
if (isset($_COOKIE['username']) && !empty($_COOKIE['username'])) {

    $username = $_COOKIE['username'];

    echo '<p><a href="profile.php">Welcome, ' . $username . '!</p></a>'; 
} else {
   
    echo '<a href="registration__form.html"><p>Login</p></a>';
}
?>

      </div>
    </header>



<body>
<main>
    <div class="profile__menu">

        <div>
            <form class="shipping__info">
                <div class="cl__info">
                    <h1>Info</h1>
                <div class="form__group field">
                  <input type="text" name="name" id="signup-name" class="form__field" placeholder="Name"/>
                  <label for="name" class="form__label">Name</label>
                </div>
                <div class="form__group field">
                    <input type="text" name="name" id="signup-surname" class="form__field" placeholder="Surname"/>
                    <label for="name" class="form__label">Surname</label>
                  </div>
                <div class="form__group field">
                  <input type="text" name="pass" id="signup-pass" class="form__field" placeholder="Password"/>
                  <label for="name" class="form__label">Password</label>
                </div>
                <div class="form__group field">
                  <input type="text" name="birthday" id="signup-birthday" class="form__field" placeholder="Birthday"/>
                  <label for="name" class="form__label">Birthday</label>
                </div>
                    </div>
                    <div class="cl__info">
                        <h1>Ship</h1>
                <div class="form__group field">
                    <input type="text" name="birthday" id="signup-country" class="form__field" placeholder="Country"/>
                    <label for="name" class="form__label">Country</label>
                  </div>
                  <div class="form__group field">
                    <input type="text" name="birthday" id="signup-city" class="form__field" placeholder="City"/>
                    <label for="name" class="form__label">City</label>
                  </div>
                  <div class="form__group field">
                    <input type="text" name="birthday" id="signup-postcode" class="form__field" placeholder="Postcode"/>
                    <label for="name" class="form__label">Postcode</label>
                  </div>
                  <div class="form__group field">
                    <input type="text" name="birthday" id="signup-address" class="form__field" placeholder="Address"/>
                    <label for="name" class="form__label">Address</label>
                  </div>
                    </div>
              </form>
    <div class="profile__button">
<input type="submit" id="logout" value="Logout">
       <input type="submit" value="Update" id="signup-submit">
       
    </div>
        </div>

    </div>
</main>
<footer>
        <div class="footer__text">
          <div class="footer_first_text">
          <a href="html/contract__offer.html">Договор оферты</a>
          <a href="html/privacy__policy.html">Политика конфиденциальности</a>
          </div>
          <div class="webstore__info">
          <p>© 2024 MONOCHROMIST webstore in RU</p>
          </div>
        </div>
  </footer>
    <script src="script/user_login.js" defer></script>
    <script src="script/profile.js"></script>
    <script src="script/ajax.js"></script>
    <script src="script/get_user_data.js"></script>
    <script src="script/logout.js"></script>
</body>
</html>


