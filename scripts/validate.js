
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = inputElement.nextElementSibling;  
    console.log(inputElement)  
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = inputElement.validity.patternMismatch ? inputElement.dataset.patternError : errorMessage    
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove('popup__input_type_error');    
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {    
    
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}



const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {

        Array.from(inputList).forEach(item => {
            // console.log(item)
        })

        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button')
    


    toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement)
        });
    });
};


const enableValidation = () => {

    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        // Finding all forms
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll('fieldset'))
        // Finding all field elements in each form - inputs and submit buttons
        fieldsetList.forEach(fieldset => {
            console.log(fieldset)
            setEventListeners(fieldset)
        })
    });
};


const formConfig1 = {
    formSelector: '.popup__form[name="fomr-edit-profile"]',
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

enableValidation(formConfig1)
enableValidation(formConfig2)