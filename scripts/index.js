// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки:
// клонировать шаблон,
// установить значения вложенных элементов,
// добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк
function createCard(
  image = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  title = "пу-пу-пууууу"
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = image;
  cardElement.querySelector(".card__title").textContent = title;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  placesList.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу в places
initialCards.forEach((item) => createCard(item.link, item.name));