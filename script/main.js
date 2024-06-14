document.querySelectorAll(".btn__buy").forEach((button) => {
  button.addEventListener("click", function () {
    const title = this.getAttribute("data-title");
    const price = this.getAttribute("data-price");
    const image = this.getAttribute("data-image");

    const size = document.querySelector('input[name="size"]:checked')?.value;

    const item = { title, price, image, size };
    localStorage.setItem("cartItem", JSON.stringify(item));

    window.location.href = "html/shopping__cart.html";
  });
});

let currentSlide = 0;
let intervalId;

function startSlider() {
  const imageCount = document.querySelectorAll(".slide").length;
  const images = document.querySelector("#slide_");

  images.style.transform = `translateX(-${currentSlide * 1300}px)`;

  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[currentSlide].classList.add("active");

  currentSlide = (currentSlide + 1) % imageCount;
}

function nextSlide() {
  pauseSlider();
  startSlider();
}

function prevSlide() {
  pauseSlider();
  currentSlide =
    (currentSlide - 2 + document.querySelectorAll(".slide").length) %
    document.querySelectorAll(".slide").length;
  startSlider();
}

function pauseSlider() {
  clearInterval(intervalId);
  setTimeout(() => {
    intervalId = setInterval(startSlider, 3000);
  }, 5000);
}

intervalId = setInterval(startSlider, 3000);

document
  .querySelector(".slider-container")
  .addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

document
  .querySelector(".slider-container")
  .addEventListener("mouseleave", () => {
    intervalId = setInterval(startSlider, 3000);
  });
