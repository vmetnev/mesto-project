import {
  Popup
} from './Popup.js'

class PopupWithForm extends Popup {
  constructor(popupHtmlSelector, submitHandler) {
    super(popupHtmlSelector)
    this.popupHtmlSelector = popupHtmlSelector
    this.el = document.querySelector(this.popupHtmlSelector)
    this.form = this.el.querySelector('form')
    this.submitHandler = submitHandler
    this.inputList = this.el.querySelectorAll('input')
    this.submitButton = this.el.querySelector('.form__submit-button')
    this.closeButton = this.el.querySelector('.popup__close-button')
    this.setEventListeners()
  }

  _getInputValues() {
    this._formValue = {}
    this.inputList.forEach(input => {
      this._formValue[input.name] = input.value
    })
    return this._formValue
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this.submitButton.textContent = "Сохранение..."
      this.submitHandler(this._getInputValues())
    })

    // cross close button click        
    this.closeButton.addEventListener('click', (evt) => {
      this.close()
    })

    // close on close on overlay
    this.el.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close()
      }
    })
  }

  open() {
    const inputs = Array.from(this.el.querySelectorAll('input'))
    inputs.forEach(input => {
      if (input.hasAttribute('reference')) {
        input.value = document.querySelector(input.getAttribute('reference')).textContent
      } else {
        input.value = ""
      }
    })
    this.el.classList.add('popup_opened')
    this._handleEscClose()
  }

  close() {
    this.submitButton.textContent = "Сохранить"
    this.el.classList.remove('popup_opened')
    let errorSpans = this.form.querySelectorAll('.form__field-error')
    errorSpans.forEach(errorSpan => {
      errorSpan.textContent = ""
    })

    console.log(this.errorInputs)
    console.log('supposed to close')
    let errorInputs = this.form.querySelectorAll('.form__input_type_error')
    errorInputs.forEach(errorInput => {
      console.log('here')
      errorInput.classList.remove('form__input_type_error')
    })
    this.form.reset()
  }
}

export {
  PopupWithForm
}
