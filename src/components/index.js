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
    setButton
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
    addCard,
    removeCard
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

// Identification of card holder
const cartHolder = document.querySelector('.elements')
const cardTemplate = document.querySelector('#card-template').content;

// Obtaining data from server

Promise.all([getProfileInfo(), getAllCards()]).then(([userData, cards]) => {

    // Profile data
    const regex = /[^A-Za-zА-ЯЁа-яё\- ]/g;
    profileTitle.textContent = (userData.name).replace(regex, '')
    profileText.textContent = (userData.about).replace(regex, '')
    profileAvatar.src = userData.avatar

    // Cards from server
    let ownership = "server"
    let ownLike = false
    cards.forEach((item) => {
        if (item.owner.name === profileTitle.textContent) {
            ownership = "own"
        } else {
            ownership = "server"
        }
        item.likes.forEach(like => {
            if (like.name === profileTitle.textContent) {
                ownLike = true
            }
        })
        cartHolder.append(createCard(cardTemplate, item._id, item.name, item.link, item.likes.length, ownership, ownLike))
        ownLike = false
    })
}).catch(error => {
    console.log(error)
})


// Setting close buttons
document.querySelectorAll('.popup__close').forEach((item) => {
    item.addEventListener('click', hideClosestPopup)
})

function submitNewAvatar(evt) {
    evt.preventDefault()
    let processError = false
    setButton(updateBlockFormButton, "Сохранение...")
    updateAvatar({
        avatar: updateBlockFormInput.value
    }).then(data => {
        profileAvatar.src = updateBlockFormInput.value
        setButton(updateBlockFormButton, "Сохранено")
        closePopup(updateBlock)
    }).catch(error => {
        processError = true
        setButton(updateBlockFormButton, "Ошибка")
        console.log(error)
    }).finally(() => {
        setTimeout(() => {
            setButton(updateBlockFormButton, "Сохранить")
        }, 1000)
    })



}



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
    let processError = false

    if (profileTitle.textContent !== formName.value || profileText.textContent !== formProfession.value) {
        profileTitle.textContent = formName.value
        profileText.textContent = formProfession.value
        setButton(editFormSubmitButton, "Сохранение...")
        updateProfile({
            name: formName.value,
            about: formProfession.value
        }).then(data => {
            setButton(editFormSubmitButton, "Сохранено")
        }).catch(error => {
            processError = true
            console.log(error)
            setButton(editFormSubmitButton, "Ошибка")
        }).finally(() => {
            if (!processError) {
                closePopup(editProfileBlock)
                setTimeout(() => {
                    setButton(editFormSubmitButton, "Сохранить")
                }, 1000)
            } else {
                setTimeout(() => {
                    setButton(editFormSubmitButton, "Сохранить")
                }, 1000)
            }
        })




    } else {
        closePopup(editProfileBlock)
    }
}

function submitNewCard(evt) {
    evt.preventDefault()
    let processError = false
    setButton(addFormSubmitBtn, "Сохранение...")
    const newText = addFormName.value
    const newImageLink = addFormLink.value

    addCard({
        name: newText,
        link: newImageLink
    }).then(data => {
        cartHolder.prepend(createCard(cardTemplate, data._id, data.name, data.link, data.likes.length, "own"))
        setButton(addFormSubmitBtn, "Сохранено")
    }).catch(error => {
        processError = true
        console.log(error)
        setButton(addFormSubmitBtn, "Ошибка")
        setTimeout(() => {
            setButton(addFormSubmitBtn, "Сохранить")
        }, 2000)
    }).finally(() => {
        if (!processError) {
            setTimeout(() => {
                setButton(addFormSubmitBtn, "Сохранить")
            }, 2000)
            closePopup(addBlock)
            addForm.reset()
        } else {
            setTimeout(() => {
                setButton(addFormSubmitBtn, "Сохранить")
            }, 2000)
        }
    })
}

startValidation()