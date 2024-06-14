document.querySelectorAll(".btn__buy").forEach((button) => {
  button.addEventListener("click", function () {
    const title = this.getAttribute("data-title");
    const price = this.getAttribute("data-price");
    const image = this.getAttribute("data-image");

    const size = document.querySelector('input[name="size"]:checked')?.value;

    const item = { title, price, image, size };
    localStorage.setItem("cartItem", JSON.stringify(item));

    window.location.href = "shopping__cart.html";
  });
});
