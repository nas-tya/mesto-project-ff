const cardTemplate = document.querySelector("#card-template").content;
const URL = "https://nomoreparties.co/v1/wff-cohort-2";

export function createCard(
  image,
  title,
  likes,
  ownerId,
  cardId,
  remove,
  like,
  openImagePopup,
  isLiked
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = image;
  cardImage.alt = "Картинка, которую автор подписал как: " + title;
  cardElement.querySelector(".card__title").textContent = title;
  cardElement.querySelector(".card__likes-number").textContent = likes.length;

  cardElement.dataset.cardId = cardId;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (ownerId === "c58787a5a7d1ae05748d4119") {
    deleteButton.addEventListener("click", () => remove(cardId));
  } else {
    deleteButton.style.display = "none";
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.classList.toggle("card__like-button_is-active", isLiked);
  likeButton.addEventListener("click", (event) => like(event, cardId));

  cardImage.addEventListener("click", (event) => openImagePopup(image, title));

  return cardElement;
}

export function deleteCard(cardId) {
  fetch(URL + "/cards/" + cardId, {
    method: "DELETE",
    headers: {
      authorization: "0d77309c-e671-4ba8-8979-1488cdd2afa2",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    cardElement.remove();
  });
}

export function likeHandler(event, cardId) {
  const likeButton = event.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const method = isLiked ? "DELETE" : "PUT";

  fetch(URL + "/cards/likes/" + cardId, {
    method: method,
    headers: {
      authorization: "0d77309c-e671-4ba8-8979-1488cdd2afa2",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const likesCountElement = likeButton
        .closest(".card")
        .querySelector(".card__likes-number");
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      likesCountElement.textContent = data.likes.length;
    })
    .catch((error) => {
      console.error("Error updating likes:", error);
    });
}
