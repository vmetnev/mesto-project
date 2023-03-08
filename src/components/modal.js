import {
    handleMouseDown,
    handleMouseUp,
    handleClick,
    handleEsc
} from "./utils.js" 

import {
    startValidation,
    assessFieldsForButton
} from "./validate.js"

function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.body.addEventListener('keydown', handleEsc)
    popup.addEventListener('mousedown', handleMouseDown)
    popup.addEventListener('mouseup', handleMouseUp)
    popup.addEventListener('click', handleClick)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    popup.removeEventListener('click', handleClick)
    popup.removeEventListener('mousedown', handleMouseDown)
    popup.removeEventListener('mouseup', handleMouseUp)
    document.body.removeEventListener('keydown', handleEsc)
}

function hideClosestPopup(evt) {
    const elementToClose = evt.target.closest('.popup')
    closePopup(elementToClose)
}

function setButton(btn,message){
    btn.textContent = message
}

export {
    openPopup,
    closePopup,
    hideClosestPopup,
    setButton
}