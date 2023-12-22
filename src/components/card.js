import * as api from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const URL = "https://nomoreparties.co/v1/wff-cohort-2";


function cloneCardTemplate() {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  return cardElement;
}

export function createCard(
  image,
  title,
  likes,
  ownerId,
  cardId,
  remove,
  like,
  openImagePopup,
  isLiked,
  userId
) {
  
  const cardElement = cloneCardTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = image;
  cardImage.alt = "Картинка, которую автор подписал как: " + title;
  cardElement.querySelector(".card__title").textContent = title;
  cardElement.querySelector(".card__likes-number").textContent = likes.length;

  cardElement.dataset.cardId = cardId;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  console.log(userId);
  if (ownerId === userId) {
    deleteButton.addEventListener("click", () => remove(cardId));
  } else {
    deleteButton.style.display = "none";
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.classList.toggle("card__like-button_is-active", isLiked);
  likeButton.addEventListener("click", (event) =>
    like(event, cardId, likeButton)
  );

  cardImage.addEventListener("click", (event) => openImagePopup(image, title));

  return cardElement;
}

export function deleteCard(cardId) {
  api.deleteCard(cardId)
  .then((res) => {
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    cardElement.remove();
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });
}

export function likeHandler(event, cardId, likeButton) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  api.toggleLike(cardId, isLiked)
    .then((data) => {
      const likesCountElement = likeButton
        .closest(".card")
        .querySelector(".card__likes-number");
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      likesCountElement.textContent = data.likes.length;
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}
