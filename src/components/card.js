const cardTemplate = document.querySelector("#card-template").content;

export function createCard(image, title, remove, like, openImagePopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = image;
  cardElement.querySelector(".card__image").alt = "Картинка, которую автор подписал как: " + title;
  cardElement.querySelector(".card__title").textContent = title;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", remove);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", like);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => openImagePopup);

  return cardElement;
}

export function deleteCard(event) {
  event.target.closest(".card").remove();
}

export function likeHandler(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}
