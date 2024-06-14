document.addEventListener("DOMContentLoaded", () => {
  const storedCartItem = localStorage.getItem("cartItem");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const costHeader = document.getElementById("cost-header");
  const totalCostP = document.getElementById("total-cost");

  let userEmail = getCookie("email");

  if (!storedCartItem) {
    emptyCartMessage.style.display = "block";
    costHeader.style.display = "none";
    totalCostP.style.display = "none";
    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton.style.display = "none";
  } else {
    const cartDiv = document.getElementById("cart");
    const cartItem = JSON.parse(storedCartItem);

    cartItem.quantity = cartItem.quantity || 1;
    cartItem.price = parseFloat(cartItem.price) || 0;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    const img = document.createElement("img");
    img.src = cartItem.image;
    img.alt = cartItem.title;

    const infoDiv = document.createElement("div");
    infoDiv.className = "info";

    const title = document.createElement("h2");
    title.innerText = cartItem.title;

    const size = document.createElement("p");
    size.className = "size-current";
    size.innerText = "Size: " + (cartItem.size || "Not selected");

    const sizeDropdown = document.createElement("div");
    sizeDropdown.className = "size-dropdown";

    const sizeOptions = document.createElement("div");
    sizeOptions.className = "size-options";

    const sizeSelect = document.createElement("select");
    ["S", "M", "L", "XL"].forEach((sizeOption) => {
      const option = document.createElement("option");
      option.value = sizeOption;
      option.innerText = sizeOption;
      if (cartItem.size === sizeOption) {
        option.selected = true;
      }
      sizeSelect.appendChild(option);
    });

    sizeSelect.addEventListener("change", (event) => {
      cartItem.size = event.target.value;
      size.innerText = "Size: " + cartItem.size;
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      sizeOptions.classList.remove("visible");
    });

    size.addEventListener("click", () => {
      sizeOptions.classList.toggle("visible");
    });

    sizeOptions.appendChild(sizeSelect);
    sizeDropdown.appendChild(size);
    sizeDropdown.appendChild(sizeOptions);

    const price = document.createElement("p");
    price.className = "price";
    price.innerText = (cartItem.price * cartItem.quantity).toFixed(2) + " USD";

    const quantityDiv = document.createElement("div");
    quantityDiv.className = "quantity";

    const decreaseButton = document.createElement("button");
    decreaseButton.innerText = "-";
    decreaseButton.addEventListener("click", () => {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        quantityP.innerText = cartItem.quantity;
        updatePrice();
        updateCostDetails();
      }
    });

    const quantityP = document.createElement("p");
    quantityP.innerText = cartItem.quantity;

    const increaseButton = document.createElement("button");
    increaseButton.innerText = "+";
    increaseButton.addEventListener("click", () => {
      cartItem.quantity += 1;
      quantityP.innerText = cartItem.quantity;
      updatePrice();
      updateCostDetails();
    });

    quantityDiv.appendChild(decreaseButton);
    quantityDiv.appendChild(quantityP);
    quantityDiv.appendChild(increaseButton);

    const removeButton = document.createElement("span");
    removeButton.className = "remove";
    removeButton.innerText = "X";
    removeButton.addEventListener("click", () => {
      localStorage.removeItem("cartItem");
      itemDiv.remove();
      emptyCartMessage.style.display = "block";
      costHeader.style.display = "none";
      totalCostP.style.display = "none";
      const costDetailsDiv = document.getElementById("cost-details");
      costDetailsDiv.style.display = "none";
      const checkoutButton = document.getElementById("checkout-button");
      checkoutButton.style.display = "none";
    });

    infoDiv.appendChild(title);
    infoDiv.appendChild(sizeDropdown);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";
    actionsDiv.appendChild(quantityDiv);
    actionsDiv.appendChild(price);
    actionsDiv.appendChild(removeButton);

    itemDiv.appendChild(img);
    itemDiv.appendChild(infoDiv);
    itemDiv.appendChild(actionsDiv);
    cartDiv.appendChild(itemDiv);

    const costDetailsDiv = document.getElementById("cost-details");

    function updatePrice() {
      const updatedPrice = (cartItem.price * cartItem.quantity).toFixed(2);
      price.innerText = updatedPrice + " USD";
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
    }

    function updateCostDetails() {
      costDetailsDiv.innerHTML = `
        <p>${cartItem.title}</p>
        <p>${cartItem.quantity}</p>
        <p>${(cartItem.price * cartItem.quantity).toFixed(2)} USD</p>
      `;
      const totalCost = (cartItem.price * cartItem.quantity).toFixed(2);
      totalCostP.innerText = "Total: " + totalCost + " USD";
    }

    updateCostDetails();
  }

  const checkoutButton = document.createElement("a");
  checkoutButton.innerText = "Pay";
  checkoutButton.id = "checkout-button";
  checkoutButton.href = "#";

  const checkoutButtonContainer = document.querySelector(
    ".checkout-button-container"
  );

  checkoutButtonContainer.appendChild(checkoutButton);

  if (!userEmail) {
    checkoutButton.innerText = "Register to Pay";
    checkoutButton.href = "../html/registration__form.html";
  }

  checkoutButton.addEventListener("click", function () {
    const storedCartItem = localStorage.getItem("cartItem");
    if (storedCartItem && userEmail) {
      const cartItem = JSON.parse(storedCartItem);
      const formData = new FormData();
      formData.append("product_name", cartItem.title);
      formData.append("quantity", cartItem.quantity);
      formData.append("size", cartItem.size || "Not selected");
      formData.append(
        "total_price",
        (cartItem.price * cartItem.quantity).toFixed(2)
      );
      formData.append("user_email", userEmail);

      fetch("../core/save_order.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          localStorage.removeItem("cartItem");
          window.location.href = "../html/order_confirmation.html";
        })
        .catch((error) => console.error("Error:", error));
    }
  });
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
