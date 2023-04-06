class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
    this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector)
    this.enableValidation()
  }

  _hideError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = '';
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass)
  }


  _checkInputValidity(inputElement) {
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(inputElement.dataset.missingMessage);
    } else if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {

      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement)
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this.config.inactiveButtonClass)
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
  }

  _setValidationEventListener() {
    this._toggleButtonState(this.inputList, this.buttonElement);

    this.formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(this.inputList, this.buttonElement);
      }, 0)
    })

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  ()=> {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this.inputList, this.buttonElement)
      })
    })
  }

  enableValidation() {
    this._setValidationEventListener();
  }
}

export { FormValidator }
