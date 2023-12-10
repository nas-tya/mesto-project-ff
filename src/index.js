import "./pages/index.css";
import {initialCards} from "./cards";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки:
// клонировать шаблон,
// установить значения вложенных элементов,
// добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк
function createCard(image, title, remove) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = image;
  cardElement.querySelector(".card__image").alt = "Картинка, которую автор подписал как: " + title;
  cardElement.querySelector(".card__title").textContent = title;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", remove);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу в places
console.log(initialCards);
initialCards.forEach((item) => placesList.append(createCard(item.link, item.name, deleteCard)));

// popups

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  addEventListeners(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  removeEventListeners(popup);
}

function addEventListeners(popup) {
  popup.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscapeKeyPress);
}

function removeEventListeners(popup) {
  popup.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscapeKeyPress);
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    const popup = event.currentTarget;
    closePopup(popup);
  }
}

function handleEscapeKeyPress(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

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


// info

// Находим форму в DOM
const formElement = document.querySelector(".popup__form"); 
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name"); 
const jobInput = document.querySelector(".popup__input_type_description"); 

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей

    const nameOutput = document.querySelector(".profile__title");
    const jobOutput = document.querySelector(".profile__description");

    // Вставьте новые значения с помощью textContent

    nameOutput.textContent = nameValue;
    jobOutput.textContent = jobValue;

    formElement.reset();
    closePopup(formElement.closest('.popup_is-opened'));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);