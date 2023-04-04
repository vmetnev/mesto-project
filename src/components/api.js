const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: '417c23b5-d216-4c43-a497-aa05308a8288',
    'Content-Type': 'application/json'
  }
}

class Api {
  constructor() {
    this._baseUrl = config.baseUrl
    this._headers = config.headers
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }



  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  saveProfileData(nameValue, aboutValue) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameValue,
        about: aboutValue
      })
    })
  }

  saveNewCard(placeName, placeLink) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: placeLink
      })
    })
  }

  putLikeToCard(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  deleteLikeToCard(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  changeAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    })
  }
}

module.exports = Api