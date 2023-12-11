import "./pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, likeHandler } from "./components/card";
import { openPopup, closePopup } from "./components/modal";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = createCard(item.link, item.name, deleteCard, likeHandler, openImgPopup);
    placesList.appendChild(card);
  });
}

renderInitialCards();

// popups

const openEditPopupButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const closeEditPopupButton = editPopup.querySelector(".popup__close");

const openAddPopupButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddPopupButton = addPopup.querySelector(".popup__close");

openEditPopupButton.addEventListener('click', () => openPopup(editPopup));
closeEditPopupButton.addEventListener('click', () => closePopup(editPopup));

openAddPopupButton.addEventListener('click', () => openPopup(addPopup));
closeAddPopupButton.addEventListener('click', () => closePopup(addPopup));

const imgPopup = document.querySelector(".popup_type_image");
const closeImgPopupButton = imgPopup.querySelector(".popup__close");

function openImgPopup(imageSrc, title) {
  const imgPopupImage = imgPopup.querySelector(".popup__image");
  imgPopupImage.src = imageSrc;
  imgPopup.querySelector(".popup__caption").textContent = title;
  openPopup(imgPopup);
}

placesList.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('card__image')) {
    // если клик был на изображении, то находим соответствующую карточку и открываем попап
    const card = target.closest('.card');
    const imageSrc = card.querySelector('.card__image').src;
    const title = card.querySelector(".card__title").textContent;
    openImgPopup(imageSrc, title);
  }
});

closeImgPopupButton.addEventListener('click', () => closePopup(imgPopup));

// edit info

const formEditElement = document.querySelector(".popup__form"); 
const nameInput = document.querySelector(".popup__input_type_name"); 
const jobInput = document.querySelector(".popup__input_type_description"); 

function handleEditFormSubmit(evt) {
    evt.preventDefault(); 

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const nameOutput = document.querySelector(".profile__title");
    const jobOutput = document.querySelector(".profile__description");

    nameOutput.textContent = nameValue;
    jobOutput.textContent = jobValue;

    formEditElement.reset();
    closePopup(formEditElement.closest('.popup_is-opened'));
}

formEditElement.addEventListener('submit', handleEditFormSubmit);

// add card

const formCardElement = document.querySelector(".popup_type_new-card .popup__form");
const placeInput = document.querySelector(".popup_type_new-card .popup__input_type_card-name");
const linkInput = document.querySelector(".popup_type_new-card .popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  const newCard = createCard(linkValue, placeValue, deleteCard, likeHandler);
  placesList.insertBefore(newCard, placesList.firstElementChild);

  formCardElement.reset();
  closePopup(formCardElement.closest('.popup_is-opened'));
}

formCardElement.addEventListener('submit', handleCardFormSubmit);