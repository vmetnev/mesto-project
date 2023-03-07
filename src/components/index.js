import '../pages/index.css'

import {
    createCard,
    deleteCard,
    likeCard
} from "./card.js"

import {
    handleMouseDown,
    handleMouseUp,
    handleClick,
    handleEsc
} from "./utils.js"

import {
    openPopup,
    closePopup,
    hideClosestPopup,
    buttonPending,
    buttonNormal,
    buttonSaved
} from "./modal.js"

import {
    startValidation,
    assessFieldsForButton
} from "./validate.js"


import {
    getProfileInfo,
    updateProfile,
    updateAvatar,
    getAllCards,
    setLike,
    deleteLike,
    addCard
} from "./api.js"


// Identification of profile block
const profileBlock = document.querySelector('.profile')
const profileImageHolder = profileBlock.querySelector('.profile__image-holder')
const profileAvatar = profileBlock.querySelector('.profile__avatar')
const profileTitle = profileBlock.querySelector('.profile__title')
const profileText = profileBlock.querySelector('.profile__text')
const editProfileBtn = profileBlock.querySelector('.profile__edit-button')
const editProfileBlock = document.querySelector('.edit')
const editForm = editProfileBlock.querySelector('.edit__form')
const editFormSubmitButton = editForm.querySelector('.edit__submit')
const formName = editProfileBlock.querySelector('input[name="form-name"]')
const formProfession = editProfileBlock.querySelector('input[name="form-profession"]')

// Identification of update block
const updateBlock = document.querySelector('.update')
const updateBlockForm = updateBlock.querySelector('.update__form')
const updateBlockFormInput = updateBlockForm.querySelector('input')


const updateBlockFormButton = updateBlockForm.querySelector('.update__submit')

updateBlockForm.addEventListener('submit', submitNewAvatar)

profileImageHolder.addEventListener('click', () => {
    updateBlockForm.reset()
    assessFieldsForButton(updateBlockForm)
    openPopup(updateBlock)
})

function submitNewAvatar(evt) {
    evt.preventDefault()
    updateAvatar({
        avatar: updateBlockFormInput.value
    }).then(data => console.log('data')).catch(error => console.log(error))
    profileAvatar.src = updateBlockFormInput.value
    closePopup(updateBlock)
}

// Obtaining profile data from server

getProfileInfo().then(data => {
    const regex = /[^A-Za-zА-ЯЁа-яё\- ]/g;
    profileTitle.textContent = (data.name).replace(regex, '')
    profileText.textContent = (data.about).replace(regex, '')
    profileAvatar.src = data.avatar
}).catch(error => console.log(error))

const cartHolder = document.querySelector('.elements')
const cardTemplate = document.querySelector('#card-template').content;

getAllCards().then(data => {
    console.log(data)
    data.forEach((item) => {
        cartHolder.append(createCard(cardTemplate, item._id, item.name, item.link, item.likes.length))
    })
}).catch(error => console.log(error))


document.querySelectorAll('.popup__close').forEach((item) => {
    item.addEventListener('click', hideClosestPopup)
})

// Identification of new item block
const addBlock = document.querySelector('.new-item')
const addForm = document.querySelector('.new-item__form')
const addFormSubmitBtn = document.querySelector('.new-item__submit')
const addFormName = addForm.querySelector('input[name="item-text"]')
const addFormLink = addForm.querySelector('input[name="item-link"]')
addForm.addEventListener('submit', submitNewCard)
const addItemBtn = profileBlock.querySelector('.profile__add-button')



editForm.addEventListener('submit', submitProfile)

editProfileBtn.addEventListener('click', () => {
    editForm.reset()
    assessFieldsForButton(editForm)
    formName.value = profileTitle.textContent
    formProfession.value = profileText.textContent
    openPopup(editProfileBlock)
})

addItemBtn.addEventListener('click', () => {
    addForm.reset()
    assessFieldsForButton(addForm)
    openPopup(addBlock)
})

function submitProfile(evt) {
    evt.preventDefault()
    if (profileTitle.textContent !== formName.value || profileText.textContent !== formProfession.value) {
        profileTitle.textContent = formName.value
        profileText.textContent = formProfession.value
        buttonPending(editFormSubmitButton)
        updateProfile({
            name: formName.value,
            about: formProfession.value
        }).then(data => {
            closePopup(editProfileBlock)
            buttonSaved(editFormSubmitButton)
            setTimeout(() => {
                buttonNormal(editFormSubmitButton)
            }, 1000)
        }).catch(error => {
            console.log(error)
            buttonNormal(editFormSubmitButton)
        })
    } else {
        closePopup(editProfileBlock)
    }
}

function submitNewCard(evt) {
    evt.preventDefault()
    console.log(evt.target)


    buttonPending(addFormSubmitBtn)

    const newText = addFormName.value
    const newImageLink = addFormLink.value

    addCard({
        name: newText,
        link: newImageLink
    }).then(data => {
        cartHolder.prepend(createCard(cardTemplate, data._id, data.name, data.link, data.likes.length,"own"))
        buttonSaved(addFormSubmitBtn)
        setTimeout(() => {
            buttonNormal(addFormSubmitBtn)
        }, 1000)
        closePopup(addBlock)
        addForm.reset()

    }).catch(error => {
        console.log(error)
    })
}

startValidation()