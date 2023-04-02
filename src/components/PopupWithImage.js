import {
  Popup
} from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupHtmlSelector) {
    super(popupHtmlSelector)
    this.popupHtmlSelector = popupHtmlSelector
    this.el = document.querySelector(this.popupHtmlSelector)
    this.popupImage = this.el.querySelector('.popup__image')
    this.imageCaption = this.el.querySelector('.popup__caption')
    super.setEventListeners()
  }

  open(cardLink, cardName) {
    this.popupImage.src = cardLink
    this.popupImage.alt = cardName
    this.imageCaption.textContent = cardName
    this.el.classList.add('popup_opened')
    this._handleEscClose()
  }
}

export {
  PopupWithImage
}
