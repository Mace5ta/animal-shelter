import pets from "./our-pets.js";

function modalWindow() {
    const htmlArea = document.querySelector("html");
    const modalArea = document.querySelector(".modal-window");
    const closeButton = document.querySelector(".modal-close-button");
    const petsCards = document.querySelectorAll(".pet-card");
    const modalImage = document.querySelector(".modal-image");
    const modalContent = document.querySelector(".modal-content");

    for (let i = 0; i < petsCards.length; i++) {
        petsCards[i].addEventListener("click", () => {
            modalArea.classList.add("active");
            htmlArea.classList.add("hidden-overflow");

            pets.map(pet => {
                if (pet.name === petsCards[i].querySelector(".pets-name").textContent) {
                    modalImage.innerHTML = `<img src="${pet.img}" alt="${pet.name}">`
                    modalContent.innerHTML = `
						<h3 class="modal-title">${pet.name}</h3>
						<h4 class="modal-subtitle">${pet.type} - ${pet.breed}</h4>
						<h5 class="modal-description">${pet.description}</h5>
						<ul class="modal-info"></ul>
                    `
                    const modalInfo = document.querySelector('.modal-info');
                    const infoItem1 = document.createElement('li');
                    const infoItem2 = document.createElement('li');
                    const infoItem3 = document.createElement('li');
                    const infoItem4 = document.createElement('li');

                    infoItem1.classList.add('info-item');
                    infoItem2.classList.add('info-item');
                    infoItem3.classList.add('info-item');
                    infoItem4.classList.add('info-item');

                    infoItem1.innerHTML = `<span>Age:</span> ${pet.age}`
                    infoItem2.innerHTML = `<span>Inoculations:</span> ${pet.inoculations.join(", ")}`
                    infoItem3.innerHTML = `<span>Diseases:</span> ${pet.diseases.join(", ")}`
                    infoItem4.innerHTML = `<span>Parasites:</span> ${pet.parasites.join(", ")}`

                    modalInfo.append(infoItem1);
                    modalInfo.append(infoItem2);
                    modalInfo.append(infoItem3);
                    modalInfo.append(infoItem4);
                }
            });
        });
    }

    modalArea.addEventListener("click", (event) => {
        if (!event.target.closest(".modal-wrapper")) {
            modalArea.classList.remove("active");
            htmlArea.classList.remove("hidden-overflow");
        }
    });

    closeButton.addEventListener("click", () => {
        modalArea.classList.remove("active");
        htmlArea.classList.remove("hidden-overflow");
    });
}

export default modalWindow;