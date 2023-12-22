export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  addEventListeners(popup);
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
