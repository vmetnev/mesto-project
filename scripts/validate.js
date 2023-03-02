function enableValidation() {
    const form = document.querySelector('.popup__form[name="form-edit-profile"]')
    form.addEventListener('submit', handleFormSubmit)
    form.addEventListener('input', handleFormInput)
}

function handleFormSubmit(evt) {

    evt.preventDefault()

    const form = evt.currentTarget;
    const isValid = form.checkValidity()

    if (isValid) {
        form.reset()
        alert("valid")
    } else {
        alert("invalid")
    }
}

function handleFormInput(evt) {
    const input = evt.target
    const form = evt.currentTarget
    console.log(input.validity)

    if (!input.validity.valid) {              
        setErrorMessage(input)        
        showInputError(input)        
        setSubmitButtonState(form)
    }

    if (input.validity.valid) {
        input.nextElementSibling.textContent = ""
        input.classList.remove('popup__input_type_error')
    }
}

function setErrorMessage(input) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.patternError)
    } else {
        input.setCustomValidity('')
    }
}

function showInputError(input) {
    const targetSpan = input.nextElementSibling
    targetSpan.textContent = input.validationMessage
    input.classList.add('popup__input_type_error')
}

function setSubmitButtonState(form) {
    const button = form.querySelector('.popup__button')
    const isValid = form.checkValidity()

    if (isValid) {
        button.removeAttribute('disabled')
        button.classList.remove('popup__button_disabled')
    } else {
        button.setAttribute('disabled', 'true')
        button.classList.add('popup__button_disabled')
    }
}


enableValidation()


const formConfig1 = {
    formSelector: '.popup__form[name="form-edit-profile"]',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const formConfig2 = {
    formSelector: '.popup__form[name="form-new-item"]',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}