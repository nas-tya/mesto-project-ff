import "./pages/index.css";
import { createCard, deleteCard, likeHandler } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import * as api from "./components/api";

const URL = "https://nomoreparties.co/v1/wff-cohort-2";

const placesList = document.querySelector(".places__list");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameOutput = document.querySelector(".profile__title");
const jobOutput = document.querySelector(".profile__description");

function renderInitialCards() {
  const cardsPromise = api.getInitialCards();
  const userPromise = api.getUserInfo();

  Promise.all([cardsPromise, userPromise])
    .then(([cardsData, userData]) => {
      console.log("Cards data:", cardsData);

      const userId = userData._id;

      cardsData.forEach((item) => {
        const isLikedByUser = item.likes.some((like) => like._id === userId);

        const card = createCard(
          item.link,
          item.name,
          item.likes,
          item.owner._id,
          item._id,
          deleteCard,
          likeHandler,
          openImgPopup,
          isLikedByUser,
          userId
        );
        placesList.appendChild(card);
      });
      nameOutput.textContent = userData.name;
      jobOutput.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
    })
    .catch((error) => {
      console.error("Error fetching cards data:", error);
    });
}

renderInitialCards();

// popups

function openFormPopup(popup) {
  const form = popup.querySelector(".popup__form");
  form.reset();
  clearValidation(popup, validationConfig);
  openPopup(popup);
}

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const buttonClosePopupProfile = popupProfile.querySelector(".popup__close");

const buttonOpenPopupAddPic = document.querySelector(".profile__add-button");
const popupAddPic = document.querySelector(".popup_type_new-card");
const buttonClosePopupAddPic = popupAddPic.querySelector(".popup__close");

const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const buttonClosePopupEditAvatar =
  popupEditAvatar.querySelector(".popup__close");

buttonOpenPopupProfile.addEventListener("click", () => {
  openFormPopup(popupProfile);
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
});

buttonClosePopupProfile.addEventListener("click", () =>
  closePopup(popupProfile)
);

buttonOpenPopupAddPic.addEventListener("click", () => {
  openFormPopup(popupAddPic);
});

buttonClosePopupAddPic.addEventListener("click", () => closePopup(popupAddPic));

buttonClosePopupEditAvatar.addEventListener("click", () =>
  closePopup(popupEditAvatar)
);

const imgPopup = document.querySelector(".popup_type_image");
const buttonClosePopupImg = imgPopup.querySelector(".popup__close");
const imgPopupImage = imgPopup.querySelector(".popup__image");
const imgPopupTitle = imgPopup.querySelector(".popup__caption");

function openImgPopup(imageSrc, title) {
  imgPopupImage.src = imageSrc;
  imgPopupImage.alt = "Картинка, которую автор подписал как: " + title;
  imgPopupTitle.textContent = title;
  openPopup(imgPopup);
}

buttonClosePopupImg.addEventListener("click", () => closePopup(imgPopup));

// edit info

const formEditElement = document.querySelector(".popup__form");
const profileImage = document.querySelector(".profile__image");

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = formEditElement.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  api
    .updateUserInfo(nameValue, jobValue)
    .then(() => {
      renderInitialCards();
      closePopup(popupProfile);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => (submitButton.textContent = "Сохранить"));
}

formEditElement.addEventListener("submit", handleEditFormSubmit);

// edit avatar

const avatarEditButton = document.querySelector(".profile__image");
const avatarForm = document.forms["avatar-form"];

avatarEditButton.addEventListener("click", () => {
  openFormPopup(popupEditAvatar);
});

function handleAvatarFormSubmit(event) {
  event.preventDefault();

  const submitButton = avatarForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  const newAvatarUrl = avatarForm.elements["avatar"].value;

  api
    .updateAvatar(newAvatarUrl)
    .then((data) => {
      avatarEditButton.style.backgroundImage = `url(${data.avatar})`;
      closePopup(document.querySelector(".popup_type_edit-avatar"));
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// add card

const formCardElement = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const placeInput = document.querySelector(
  ".popup_type_new-card .popup__input_type_card-name"
);
const linkInput = document.querySelector(
  ".popup_type_new-card .popup__input_type_url"
);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = formCardElement.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  api
    .addCard(placeValue, linkValue)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData.link,
        newCardData.name,
        newCardData.likes,
        newCardData.owner._id,
        newCardData._id,
        deleteCard,
        likeHandler,
        openImgPopup,
        false,
        newCardData.owner._id
      );
      placesList.insertBefore(newCard, placesList.firstElementChild);
      closePopup(popupAddPic);
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
}

formCardElement.addEventListener("submit", handleCardFormSubmit);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
