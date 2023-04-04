class Card {
  constructor(userId, card, selector, api, popupWithImage) {
    this.userId = userId
    this.card = card
    this.templateSelector = selector
    this.api = api
    this.popupWithImage = popupWithImage
  }

  _getCard() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content
      .querySelector('.elements__container')
      .cloneNode(true);
    return cardElement;
  }

  generate() {
    this._element = this._getCard();
    this._element.querySelector('.elements__title').textContent = this.card.name
    this._element.querySelector('.elements__item').src = this.card.link
    this._element.querySelector('.elements__item').setAttribute('__id', this.card._id)
    this._element.querySelector('.elements__item').alt = this.card.name
    this._likeCounter = this._element.querySelector('.elements__like-counter')
    this._elementItem = this._element.querySelector('.elements__item')
    this._elemenentLike = this._element.querySelector('.elements__like')
    this._elementsDelete = this._element.querySelector('.elements__delete')

    if (this.card.likes) {
      this._likeCounter.textContent = this.card.likes.length
      if (this.card.likes.some(like => like._id === this.userId)) {
        this._elemenentLike.classList.add('elements__like_active');
      }
    } else {
      this._likeCounter.textContent = "0"
    }
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    // open view popup
    this._elementItem.addEventListener('click', (evt) => {
      this.popupWithImage.open(evt.target.src, evt.target.alt)
    })

    // handle like
    this._elemenentLike.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('elements__like_active')) {
        this.api.deleteLikeToCard(this.card._id)
          .then((res) => {
            evt.target.classList.toggle('elements__like_active');
            this._likeCounter.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.api.putLikeToCard(this.card._id)
          .then((res) => {
            evt.target.classList.toggle('elements__like_active');
            this._likeCounter.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })

    // delete if available
    if (this.card.owner && this.userId !== this.card.owner._id) {
      this._elementsDelete .remove()
    } else {
      this._elementsDelete .addEventListener('click', (evt) => {
        const elementItem = this._element.closest('.elements__container');
        this.api.deleteCard(this.card._id)
          .then(() => {
            elementItem.remove()
          })
          .catch((res) => {
            console.log(res)
          })
      })
    }
  }
}

export {
  Card
}
