import pets from "./our-pets.js";
import modalWindow from "./modal-window.js";

const leftStartButton = document.querySelector("#left-start-button");
const leftButton = document.querySelector("#left-button");
const centerButton = document.querySelector("#center-button");
const rightButton = document.querySelector("#right-button");
const rightEndButton = document.querySelector("#right-end-button");
const buttonPagination = document.querySelectorAll(".button-pagination");
const ourFriendsBlock = document.querySelector(".our-friends-block");

let cardsNumber = 48;
let initialPageNumber = 1;
let currentPageNumber = initialPageNumber;
let cardsSize;
let endPageNumber;

let petIdArr = pets.map(pet => pet.id);
let petIdBigArr = [];

window.addEventListener("DOMContentLoaded", () => {
    getCardsSize();
    createIdBigArray();
    createPetCardElements();
    modalWindow();

    leftStartButton.classList.add("inactive")
    leftButton.classList.add("inactive")
});

function getCardsSize() {
    if (window.innerWidth > 1279) {
        cardsSize = 8;
    } else if (window.innerWidth > 625) {
        cardsSize = 6;
    } else {
        cardsSize = 3;
    }
    endPageNumber = cardsNumber / cardsSize;
}

function createIdBigArray() {
    for (let i = 0; i < cardsNumber / 8; i++) {
        petIdArr.sort(() => Math.random() - 0.5);
        petIdBigArr = [...petIdBigArr, ...petIdArr];
    }
}

function createPetCardElements() {
    ourFriendsBlock.innerHTML = "";

    let startPosition = cardsSize * (currentPageNumber - 1);
    let endPosition = cardsSize * currentPageNumber;

    for (let i = startPosition; i < endPosition; i++) {
        const petCard = document.createElement("div");
        petCard.classList.add("pet-card");
        petCard.innerHTML = `
			<div class="pet-card-img">
				<img src="${pets[petIdBigArr[i]].img}" alt="pets-${pets[petIdBigArr[i]].name}">
			</div>
			<span class="pets-name">${pets[petIdBigArr[i]].name}</span>
            <button class="button secondary">Learn more</button>`

        ourFriendsBlock.append(petCard);
    }
}

function clickOnArrow() {
    if (currentPageNumber === 1) {
        leftStartButton.classList.add("inactive")
        leftButton.classList.add("inactive")
        rightButton.classList.remove("inactive")
        rightEndButton.classList.remove("inactive")
    } else if (currentPageNumber === endPageNumber) {
        rightButton.classList.add("inactive")
        rightEndButton.classList.add("inactive")
        leftStartButton.classList.remove("inactive")
        leftButton.classList.remove("inactive")
    } else {
        buttonPagination.forEach(button => button.classList.remove("inactive"))
    }
    createPetCardElements();
    modalWindow();
    centerButton.textContent = currentPageNumber;
}

leftStartButton.addEventListener("click", () => {
    currentPageNumber = initialPageNumber;
    clickOnArrow();
})

leftButton.addEventListener("click", () => {
    if (currentPageNumber === initialPageNumber) {
        currentPageNumber = initialPageNumber;
    } else {
        currentPageNumber--;
    }
    clickOnArrow();
})

rightButton.addEventListener("click", () => {
    if (currentPageNumber === endPageNumber) {
        currentPageNumber = endPageNumber;
    } else {
        currentPageNumber++;
    }
    clickOnArrow();
})

rightEndButton.addEventListener("click", () => {
    currentPageNumber = endPageNumber;
    clickOnArrow();
})