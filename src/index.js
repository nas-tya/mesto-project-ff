import "./pages/index.css";
import { createCard, deleteCard, likeHandler } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import * as api from "./components/api";

const URL = "https://nomoreparties.co/v1/wff-cohort-2";

const placesList = document.querySelector(".places__list");

function renderInitialCards() {
  const cardsPromise = api.getInitialCards();

  Promise.all([cardsPromise])
    .then(([cardsData]) => {
      console.log("Cards data:", cardsData);

      cardsData.forEach((item) => {
        const isLikedByUser = item.likes.some(
          (like) => like._id === "c58787a5a7d1ae05748d4119"
        );

        const card = createCard(
          item.link,
          item.name,
          item.likes,
          item.owner._id,
          item._id,
          deleteCard,
          likeHandler,
          openImgPopup,
          isLikedByUser
        );
        placesList.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching cards data:", error);
    });
}

renderInitialCards();

// popups

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const buttonClosePopupProfile = popupProfile.querySelector(".popup__close");

const buttonOpenPopupAddPic = document.querySelector(".profile__add-button");
const popupAddPic = document.querySelector(".popup_type_new-card");
const buttonClosePopupAddPic = popupAddPic.querySelector(".popup__close");

const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const buttonClosePopupEditAvatar =
  popupEditAvatar.querySelector(".popup__close");

buttonOpenPopupProfile.addEventListener("click", () => openPopup(popupProfile));
buttonClosePopupProfile.addEventListener("click", () =>
  closePopup(popupProfile)
);

buttonOpenPopupAddPic.addEventListener("click", () => openPopup(popupAddPic));
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
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameOutput = document.querySelector(".profile__title");
const jobOutput = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const infoUpdate = () => {
  api
    .getUserInfo()
    .then((data) => {
      console.log(data);
      nameOutput.textContent = data.name;
      jobOutput.textContent = data.about;
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((error) => {
      console.error("Error fetching cards data:", error);
    });
};

infoUpdate();

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = formEditElement.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  infoUpdate();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  api
    .updateUserInfo(nameValue, jobValue)
    .then(() => {
      infoUpdate();
      formEditElement.reset();
      closePopup(popupProfile);
      submitButton.textContent = "Сохранить";

      clearValidation(formEditElement, validationConfig);
    })
    .catch((error) => {
      console.error("Error updating profile:", error);

      submitButton.textContent = "Сохранить";
    });
}

formEditElement.addEventListener("submit", handleEditFormSubmit);

// edit avatar

const avatarEditButton = document.querySelector(".profile__image");
const avatarForm = document.forms["avatar-form"];

avatarEditButton.addEventListener("click", () =>
  openPopup(document.querySelector(".popup_type_edit-avatar"))
);

avatarForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const submitButton = avatarForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  const newAvatarUrl = avatarForm.elements["avatar"].value;

  api
    .updateAvatar(newAvatarUrl)
    .then((data) => {
      avatarEditButton.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    })
    .finally(() => {
      avatarForm.reset();
      clearValidation(avatarForm, validationConfig);
      closePopup(document.querySelector(".popup_type_edit-avatar"));
      submitButton.textContent = "Сохранить";
    });
});

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
    .then(() => {
      const newCard = createCard(
        linkValue,
        placeValue,
        deleteCard,
        likeHandler,
        openImgPopup
      );
      placesList.insertBefore(newCard, placesList.firstElementChild);
      clearValidation(formCardElement, validationConfig);
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    })
    .finally(() => {
      formCardElement.reset();
      closePopup(popupAddPic);
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
