const URL = "https://nomoreparties.co/v1/wff-cohort-2";
const headers = {
  authorization: "0d77309c-e671-4ba8-8979-1488cdd2afa2",
  "Content-Type": "application/json",
};

export function getInitialCards() {
  return fetch(`${URL}/cards`, {
    headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function getUserInfo() {
  return fetch(`${URL}/users/me`, {
    headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function updateUserInfo(nameValue, aboutValue) {
  return fetch(`${URL}/users/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name: nameValue,
      about: aboutValue,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function addCard(placeValue, linkValue) {
  return fetch(`${URL}/cards`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: placeValue,
      link: linkValue,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function deleteCard(cardId) {
  return fetch(`${URL}/cards/${cardId}`, {
    method: "DELETE",
    headers,
  });
}

export function toggleLike(cardId, isLiked) {
  const method = isLiked ? "DELETE" : "PUT";

  return fetch(`${URL}/cards/likes/${cardId}`, {
    method,
    headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function updateAvatar(avatarUrl) {
  return fetch(`${URL}/users/me/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
