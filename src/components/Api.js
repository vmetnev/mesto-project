class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }


  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  saveProfileData(nameValue, aboutValue) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: nameValue,
          about: aboutValue
        })
      })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  saveNewCard(placeName, placeLink) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: placeName,
          link: placeLink
        })
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  putLikeToCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  deleteLikeToCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        }),
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }
}

export { Api }