const cardTemplate = document.querySelector("#card-template").content;

export function createCard(image, title, remove, like, openImagePopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = image;
  cardImage.alt = "Картинка, которую автор подписал как: " + title;
  cardElement.querySelector(".card__title").textContent = title;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", remove);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", like);
  cardImage.addEventListener("click", (event) => openImagePopup(image, title));

  return cardElement;
}

export function deleteCard(event) {
  event.target.closest(".card").remove();
}

export function likeHandler(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}
