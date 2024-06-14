document.addEventListener("DOMContentLoaded", function () {
  var favoriteItemsContainer = document.getElementById("favoriteItems");
  var favoriteItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

  function displayFavoriteItems() {
    if (favoriteItems.length > 0) {
      favoriteItemsContainer.innerHTML = "";

      favoriteItems.forEach(function (item, index) {
        var favoriteItemHTML = `
                    <div class="favorite-item" data-index="${index}">
                        <img src="${item.image}" alt="${item.title}" class="favorite-item-image" style="width: 300px; height: 200px;">
                        <div class="favorite-item-details">
                            <h2 class="favorite-item-title">${item.title}</h2>
                            <p class="favorite-item-price">$${item.price}</p>

                            <button class="remove-item" data-id="${index}">Remove</button>
                        </div>
                    </div>
                              <div class="pay__Button">
          <button id="payButton"
                            class="btn__buy"
                  data-title="THE SOUL"
                  data-price="150"
                  data-image="../images/t-shuts.png">Order</button>
          </div>
                `;
        favoriteItemsContainer.innerHTML += favoriteItemHTML;
      });
    } else {
      favoriteItemsContainer.innerHTML =
        '<p class="no-favorite-items">There are no selected products</p>';
    }

    updateCartCount(favoriteItems.length);
  }

  displayFavoriteItems();

  favoriteItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      var index = parseInt(event.target.dataset.id);
      favoriteItems.splice(index, 1);
      displayFavoriteItems();

      var payButtonContainer = document.querySelector(".pay__Button");
      if (payButtonContainer) {
        payButtonContainer.remove();
      }

      updateCartCount(0);

      localStorage.removeItem("cartCount");
      localStorage.removeItem("cartProducts");
      localStorage.removeItem("alreadyLiked");

      saveToLocalStorage();
    }
  });

  function saveToLocalStorage() {
    localStorage.setItem("cartProducts", JSON.stringify(favoriteItems));
  }

  function getQuantity(item) {
    return item.quantity || 1;
  }

  function updateCartCount(count) {}
});
