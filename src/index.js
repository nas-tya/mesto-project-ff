import './pages/index.css';
import {initialCards} from './cards';

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
  cardElement.querySelector(".card__image").alt = 'Картинка, которую автор подписал как: ' + title;
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
