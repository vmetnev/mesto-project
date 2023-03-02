function enableValidation() {

    const form = document.querySelector('.popup__form[name="form-edit-profile"]')
    form.addEventListener('submit', handleFormSubmit)

    const inputFields = Array.from(form.querySelectorAll('.popup__input'))

    inputFields.forEach(inputField => {
        handleFormInput(form, inputField)
        inputField.addEventListener('input', () => {
            handleFormInput(form, inputField)
        })
    })

    setSubmitButtonState(form)

    const form1 = document.querySelector('.popup__form[name="form-new-item"]')
    form1.addEventListener('submit', handleFormSubmit)

    const inputFields1 = Array.from(form1.querySelectorAll('.popup__input'))
    inputFields1.forEach(inputField => {
        inputField.addEventListener('input', () => {
            handleFormInput(form1, inputField)
        })
    })


    setSubmitButtonState(form1)

}

function handleFormSubmit(evt) {
    evt.preventDefault()
    const form = evt.currentTarget;
    const isValid = form.checkValidity()
    if (isValid) {
        form.reset()
    }
}

function handleFormInput(form, input) {


    if (!input.validity.valid) {
        setErrorMessage(input)
        showInputError(input)
        setSubmitButtonState(form)
    }

    if (input.validity.valid) {
        input.nextElementSibling.textContent = ""
        input.classList.remove('popup__input_type_error')
        setSubmitButtonState(form)
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
        button.setAttribute('disabled', true)
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
    errorClass: 'popup__error_visible',
    validationAtOpen: true
}

const formConfig2 = {
    formSelector: '.popup__form[name="form-new-item"]',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    validationAtOpen: false
}