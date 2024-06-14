var cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

if (document.getElementById("cartCount")) {
  document.getElementById("cartCount").innerText = cartCount;
}

var likeButton = document.querySelector("#likeButton");
likeButton.addEventListener("click", function () {
  var alreadyLiked = JSON.parse(localStorage.getItem("alreadyLiked")) || false;

  if (!alreadyLiked) {
    var title = likeButton.getAttribute("data-title");
    var price = likeButton.getAttribute("data-price");
    var image = likeButton.getAttribute("data-image");

    var productData = {
      title: title,
      price: price,
      image: image,
    };

    localStorage.setItem("alreadyLiked", JSON.stringify(true));

    var cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    cartProducts.push(productData);

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

    cartCount++;

    document.getElementById("cartCount").innerText = cartCount;

    localStorage.setItem("cartCount", cartCount);

    likeButton.disabled = true;
  }
});
