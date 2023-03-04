import {
    handleMouseDown,
    handleMouseUp,
    handleClick,
    handleEsc
} from "./utils.js"

function openPopup(popup) {
    // variables to avoid closing popup on mousedown on the form and mouseup outside of the form
    let mouseUpTarget
    let mouseDownTarget
    popup.classList.add('popup_opened')
    formName.value = profileTitle.textContent
    formProfession.value = profileText.textContent
    document.body.addEventListener('keydown', handleEsc)
    popup.addEventListener('mousedown', handleMouseDown)
    popup.addEventListener('mouseup', handleMouseUp)
    popup.addEventListener('click', handleClick)
    startValidation()
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    popup.removeEventListener('click', handleClick)
    popup.removeEventListener('mousedown', handleMouseDown)
    popup.removeEventListener('mouseup', handleMouseUp)
    document.body.removeEventListener('keydown', handleEsc)
    const errorMessages = Array.from(popup.querySelectorAll('.popup__error_visible'))
    errorMessages.forEach(item => item.textContent = "")
    const inputFields = Array.from(popup.querySelectorAll('.popup__input'))
    inputFields.forEach(item => item.classList.remove('popup__input_type_error'))
    popup.querySelector('.popup__form').reset()
}

function hideClosestPopup(evt) {
    const elementToClose = evt.target.closest('.popup')
    closePopup(elementToClose)
}

export {
    openPopup,
    closePopup,
    hideClosestPopup
}