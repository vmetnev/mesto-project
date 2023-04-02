class Popup {
  constructor(popupHtmlSelector) {
    this.popupHtmlSelector = popupHtmlSelector
    this.el = document.querySelector(popupHtmlSelector)
    this.closeButton = this.el.querySelector('.popup__close-button')
  }

  open() {
    this.el.classList.add('popup_opened')
  }

  close() {    
    this.el.classList.remove('popup_opened')
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      this._handleKeyDown(evt)
    });
  }

  _handleKeyDown(evt) {
    if (evt.key === "Escape") {
      this.close()
    }
    document.removeEventListener('keydown', (evt) => {
      this._handleKeyDown(evt)
    });
  }

  setEventListeners() {
    // cross close button click
    this.closeButton.addEventListener('click', (evt) => {
      this.close()
    })

    // close on overlay click
    this.el.addEventListener('click', (evt) => {          
      if (evt.currentTarget === evt.target) {        
        this.close()
      }
    })
  }

}

export {
  Popup
}
