const htmlArea = document.querySelector("html");
const navigationFilter = document.querySelector(".navigation-filter");
const navigationHeader = document.querySelector(".navigation");
const burgerButton = document.querySelector(".burger");

burgerButton.addEventListener("click", () => {
    navigationFilter.classList.toggle("active");
    htmlArea.classList.toggle("hidden-overflow");
    burgerButton.classList.toggle("active");
});

navigationHeader.addEventListener("click", (event) => {
    if (event.target.classList.contains("navigation-link")) closeMenu();
})

navigationFilter.addEventListener("click", closeMenu);

function closeMenu() {
    navigationFilter.classList.remove("active");
    htmlArea.classList.remove("hidden-overflow");
    burgerButton.classList.remove("active");
}