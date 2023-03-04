import {
    openPopup,
    closePopup,
    hideClosestPopup
} from "./modal.js"

let mouseDownTarget
let mouseUpTarget

function handleMouseDown(evt) {
    mouseDownTarget = evt.target
}

function handleMouseUp(evt) {
    mouseUpTarget = evt.target
}

function handleClick(evt) {
    let target = evt.target
    if (target.classList.contains('popup_opened') && mouseDownTarget === mouseUpTarget) {
        closePopup(target)
    }
}

function handleEsc(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_opened'))
    }
}

export {
    handleMouseDown,
    handleMouseUp,
    handleClick,
    handleEsc,
    mouseDownTarget,
    mouseUpTarget
}