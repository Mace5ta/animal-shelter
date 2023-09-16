import pets from "./our-pets.js";
import modalWindow from "./modal-window.js"

const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
const slider = document.querySelector(".slider");
const petsCards = document.querySelectorAll(".pets-cards");
const itemPast = document.querySelector(".cards1");
const itemCurrent = document.querySelector(".cards2");
const itemNext = document.querySelector(".cards3");

const numberStages = 3;
let numberCards;
let randomArray = [];
let petElement;

window.addEventListener("DOMContentLoaded", () => {
    getCountCards();
    createPetsCards();
    modalWindow();
});

window.addEventListener("resize", () => {
    const numberCardsResize = numberCards;

    getCountCards();

    const isResize = numberCardsResize !== numberCards;

    if (isResize) {
        randomArray = [];
        petsCards.forEach(petCard => petCard.innerHTML = "");
        createPetsCards();
        modalWindow();
    }
});

const moveRight = () => {
    slider.classList.add("transition-right");
    arrowLeft.removeEventListener("click", moveLeft);
    arrowRight.removeEventListener("click", moveRight);
}

const moveLeft = () => {
    slider.classList.add("transition-left");
    arrowLeft.removeEventListener("click", moveLeft);
    arrowRight.removeEventListener("click", moveRight);
}

function getCountCards() {
    if (window.innerWidth > 1279) {
        numberCards = 3;
    } else if (window.innerWidth > 625) {
        numberCards = 2;
    } else {
        numberCards = 1;
    }
}

let isRightDirection = true;

function getRandomIdx() {
    let idx = Math.floor(Math.random() * pets.length);

    if (randomArray.length < pets.length) {
        return randomArray.includes(idx) ? getRandomIdx(idx) : idx;
    } else {
        const itemArrayCenter = isRightDirection ? randomArray.slice(numberCards, numberCards * 2 + 2) : randomArray.slice(0, numberCards * 2 - 1);
        return itemArrayCenter.includes(idx) ? getRandomIdx(idx) : idx;
    }
}

function createPetCardElement() {
    let idx = getRandomIdx();
    isRightDirection ? randomArray.push(idx) : randomArray.unshift(idx);

    petElement = `
			<div class="pet-card-img">
				<img src="${pets[idx].img}" alt="pets-${pets[idx].name}">
			</div>
			<span class="pets-name">${pets[idx].name}</span>
            <button class="button secondary">Learn more</button>
    `
}

function createPetsCards() {
    for (let i = 1; i <= numberStages; i++) {
        let k = 0;

        while (k < numberCards) {
            createPetCardElement();
            const petCard = document.createElement("div");
            petCard.classList.add("pet-card");
            petCard.innerHTML = petElement;
            document.querySelector(".cards" + i).append(petCard);
            k++;
        }
    }
}

arrowLeft.addEventListener("click", moveLeft);
arrowRight.addEventListener("click", moveRight);

slider.addEventListener("animationend", (animationEvent) => {
    let changedItem;
    if (animationEvent.animationName === "move-right") {
        slider.classList.remove("transition-right");
        isRightDirection = true;
        changedItem = itemNext;
        randomArray.splice(0, numberCards);

        itemPast.innerHTML = itemCurrent.innerHTML;
        itemCurrent.innerHTML = itemNext.innerHTML;
    } else {
        slider.classList.remove("transition-left");
        isRightDirection = false;
        changedItem = itemPast;
        randomArray.splice(numberCards * 2);

        itemNext.innerHTML = itemCurrent.innerHTML;
        itemCurrent.innerHTML = itemPast.innerHTML;
    }

    changedItem.innerHTML = "";

    for (let i = 0; i < numberCards; i++) {
        createPetCardElement();
        const petCard = document.createElement("div");
        petCard.classList.add("pet-card");
        petCard.innerHTML = petElement;
        isRightDirection ? changedItem.append(petCard) : changedItem.prepend(petCard);
    }
    modalWindow();

    arrowLeft.addEventListener("click", moveLeft);
    arrowRight.addEventListener("click", moveRight);
})





