import "./pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, likeHandler } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
// import { getCards, getInfo } from "./components/api";

const URL = "https://nomoreparties.co/v1/wff-cohort-2";

const placesList = document.querySelector(".places__list");

// function renderInitialCards() {
//   initialCards.forEach((item) => {
//     const card = createCard(
//       item.link,
//       item.name,
//       deleteCard,
//       likeHandler,
//       openImgPopup
//     );
//     placesList.appendChild(card);
//   });
// }

function renderInitialCards() {
  fetch((URL + '/cards'), {
    headers: {
      authorization: '0d77309c-e671-4ba8-8979-1488cdd2afa2'
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
    const card = createCard(
      item.link,
      item.name,
      deleteCard,
      likeHandler,
      openImgPopup
    );
    placesList.appendChild(card);

    // ИДЕЯ ХОРОШАЯ ДОДЕЛАТЬ

    
  //   document.querySelector(".card__likes-number").classList.add(`id_${item._id}`);
  //   document.querySelector(`.id_${item._id}`).textContent = item.likes.length;
  //   console.log("Лайков в верстке: " + document.querySelector(".card__likes-number").textContent + "  Лайков на сервере: " + item.likes.length)
  // });})}


renderInitialCards();

// popups

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const buttonClosePopupProfile = popupProfile.querySelector(".popup__close");

const buttonOpenPopupAddPic = document.querySelector(".profile__add-button");
const popupAddPic = document.querySelector(".popup_type_new-card");
const buttonClosePopupAddPic = popupAddPic.querySelector(".popup__close");

buttonOpenPopupProfile.addEventListener("click", () => openPopup(popupProfile));
buttonClosePopupProfile.addEventListener("click", () =>
  closePopup(popupProfile)
);

buttonOpenPopupAddPic.addEventListener("click", () => openPopup(popupAddPic));
buttonClosePopupAddPic.addEventListener("click", () => closePopup(popupAddPic));

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
fetch((URL + '/users/me'), {
  method: 'GET',
  headers: {
    authorization: '0d77309c-e671-4ba8-8979-1488cdd2afa2',
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then((data) => {
  console.log(data);
  nameOutput.textContent = data.name;
  jobOutput.textContent = data.about;
  profileImage.src = data.avatar;
});}

infoUpdate();


function handleEditFormSubmit(evt) {
  evt.preventDefault();
  infoUpdate();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  
  fetch(URL + '/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '0d77309c-e671-4ba8-8979-1488cdd2afa2',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameValue,
    about: jobValue,
  })
});

  infoUpdate();
  formEditElement.reset();
  closePopup(popupProfile);

  clearValidation(formEditElement, validationConfig);
}

formEditElement.addEventListener("submit", handleEditFormSubmit);

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

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  fetch(URL + '/cards', {
    method: 'POST',
    headers: {
      authorization: '0d77309c-e671-4ba8-8979-1488cdd2afa2',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: placeValue,
      link: linkValue
    })
  });

  const newCard = createCard(linkValue, placeValue, deleteCard, likeHandler, openImgPopup);
  placesList.insertBefore(newCard, placesList.firstElementChild);

  formCardElement.reset();
  closePopup(popupAddPic);

  clearValidation(formCardElement, validationConfig);
}

formCardElement.addEventListener("submit", handleCardFormSubmit);


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

//api

// const getCards = () => {
//   return fetch((URL + '/cards'), {
//   headers: {
//     authorization: '0d77309c-e671-4ba8-8979-1488cdd2afa2'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//     return result;
//   });
// }


// const getInfo = () => {
//   return fetch((URL + '/users/me'), {
//     method: 'GET',
//     headers: {
//       authorization: '0d77309c-e671-4ba8-8979-1488cdd2afa2'
//     }
//   })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//     return result;
//   });
// }

// getCards();
// getInfo();
// console.log('aaaaa', getInfo().then((res) => console.log(res)).name); 