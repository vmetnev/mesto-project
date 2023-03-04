const form1Config = {
    formSelector: '.popup__form[name="form-edit-profile"]',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    validationAtOpen: true
}

const form2Config = {
    formSelector: '.popup__form[name="form-new-item"]',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    validationAtOpen: false
}

function startValidation() {
    enableValidation(form1Config)
    enableValidation(form2Config)
}

function enableValidation(config) {

    const form = document.querySelector(config.formSelector)
    form.addEventListener('submit', handleFormSubmit)
    const inputFields = Array.from(form.querySelectorAll(config.inputSelector))

    inputFields.forEach(inputField => {
        if (config.validationAtOpen) handleFormInput(config, form, inputField)
        inputField.addEventListener('input', () => {
            handleFormInput(config, form, inputField)
        })
    })
    setSubmitButtonState(config, form)
}

function handleFormSubmit(evt) {
    evt.preventDefault()
    const form = evt.currentTarget;
    const isValid = form.checkValidity()
    if (isValid) {
        form.reset()
    }
}

function handleFormInput(config, form, input) {
    if (!input.validity.valid) {
        setErrorMessage(config, input)
        showInputError(config, input)
        setSubmitButtonState(config, form)
    }
    if (input.validity.valid) {
        input.nextElementSibling.textContent = ""
        input.classList.remove(config.inputErrorClass)
        setSubmitButtonState(config, form)
    }
}

function setErrorMessage(config, input) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.patternError)
    } else {
        input.setCustomValidity('')
    }
}

function showInputError(config, input) {
    const targetSpan = input.nextElementSibling
    targetSpan.textContent = input.validationMessage
    input.classList.add(config.inputErrorClass)
}

function setSubmitButtonState(config, form) {
    const button = form.querySelector(config.submitButtonSelector)
    const isValid = form.checkValidity()

    if (isValid) {
        button.removeAttribute('disabled')
        button.classList.remove(config.inactiveButtonClass)
    } else {
        button.setAttribute('disabled', true)
        button.classList.add('popup__button_disabled')
    }
}

export {startValidation}



