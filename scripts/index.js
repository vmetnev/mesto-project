import './pages/index.css';

import {
    initialCards,
    createCard,
    deleteCard,
    likeCard
} from "./card.js"

import {
    openPopup,
    closePopup,
    hideClosestPopup
} from "./modal.js"

import {
    handleMouseDown,
    handleMouseUp,
    handleClick,
    handleEsc
} from "./utils.js"


import {
    startValidation
} from "./validate.js"

const cartHolder = document.querySelector('.elements')
initialCards.forEach((item) => {      
    cartHolder.append(createCard(item.name, item.link))
})

document.querySelectorAll('.popup__close').forEach((item) => {
    item.addEventListener('click', hideClosestPopup)
})

// Identification of new item block
const addBlock = document.querySelector('.new-item')
const addForm = document.querySelector('.new-item__form')
const addFormName = addForm.querySelector('input[name="item-text"]')
const addFormLink = addForm.querySelector('input[name="item-link"]')
addForm.addEventListener('submit', submitNewCard)

// Identification of view block
const viewItemBlock = document.querySelector('.view')
const viewTargetImage = viewItemBlock.querySelector('.view__image')
const viewTargetText = viewItemBlock.querySelector('.view__text')

// Identification of profile block
const profileBlock = document.querySelector('.profile')
const profileTitle = profileBlock.querySelector('.profile__title')
const profileText = profileBlock.querySelector('.profile__text')
const editProfileBtn = profileBlock.querySelector('.profile__edit-button')
const addItemBtn = profileBlock.querySelector('.profile__add-button')
const editProfileBlock = document.querySelector('.edit')
const editForm = editProfileBlock.querySelector('.edit__form')
const formName = editProfileBlock.querySelector('input[name="form-name"]')
const formProfession = editProfileBlock.querySelector('input[name="form-profession"]')
editForm.addEventListener('submit', submitProfile)

editProfileBtn.addEventListener('click', () => {
    formName.value = profileTitle.textContent
    formProfession.value = profileText.textContent
    openPopup(editProfileBlock)
})

addItemBtn.addEventListener('click', () => {
    addForm.reset()
    openPopup(addBlock)
})

function submitProfile(evt) {
    evt.preventDefault()
    profileTitle.textContent = formName.value
    profileText.textContent = formProfession.value
    closePopup(editProfileBlock)
}

function submitNewCard(evt) {
    evt.preventDefault()

    const newText = addFormName.value
    const newImageLink = addFormLink.value

    const img = new Image()
    img.src = newImageLink

    img.onerror = () => {
        return
    }

    img.onload = () => {
        cartHolder.prepend(createCard(newText, newImageLink))
        closePopup(addBlock)
        addForm.reset()
    }
}


startValidation()