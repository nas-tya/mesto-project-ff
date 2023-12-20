import * as api from "./api";
import { clearValidation } from "./validation";
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  addEventListeners(popup);

  const form = popup.querySelector(".popup__form");

  if (form) {
    clearValidation(form, validationConfig);
    form.reset();
  }

  if (popup.classList.contains("popup_type_edit")) {
    api
      .getUserInfo()
      .then((userInfo) => {
        document.querySelector(".popup__input_type_name").value = userInfo.name;
        document.querySelector(".popup__input_type_description").value =
          userInfo.about;
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  removeEventListeners(popup);
}

function addEventListeners(popup) {
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscapeKeyPress);
}

function removeEventListeners(popup) {
  popup.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscapeKeyPress);
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    const popup = event.currentTarget;
    closePopup(popup);
  }
}

function handleEscapeKeyPress(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
