import {
    openPopup,
    closePopup,
    hideClosestPopup
} from "./modal.js"


import {
    setLike,
    deleteLike,
    addCard,
    removeCard
} from "./api.js"

function createCard(cardTemplate, id, name, link, likes, ownership = "server", ownLike = false) {
    const cardInstance = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardInstance.querySelector('.element__image')
    const trashBox = cardInstance.querySelector('.element__delete')
    cardInstance.setAttribute('_id', id)
    cardInstance.querySelector('.element__text').textContent = name
    cardInstance.querySelector('.element__likes').textContent = likes
    if (ownLike) cardInstance.querySelector('.element__heart').classList.add('element__heart_active')
    ownership == "server" ? trashBox.style.visibility = "hidden" : trashBox.style.visibility = "visible"
    cardImage.src = link
    cardImage.alt = name
    cardImage.addEventListener('click', (evt) => {
        viewImage(evt, document.querySelector('.view'))
    })
    cardInstance.querySelector('.element__delete').addEventListener('click', deleteCard)
    cardInstance.querySelector('.element__heart').addEventListener('click', likeCard)
    return cardInstance
}

// Identification of confirm block

const confirmPopup = document.querySelector('.confirm')
const confirmForm = confirmPopup.querySelector('.confirm__form')
const confirmFormButtonSubmit = confirmPopup.querySelector('.confirm__submit')
console.log(confirmFormButtonSubmit)
confirmForm.addEventListener('submit', confirmFormSubmit)
confirmForm.addEventListener('keydown', () => {

})

let elementToDelete = ""

function deleteCard(evt) {
    console.log(evt.target.closest('.element').getAttribute('_id'))
    elementToDelete = evt.target.closest('.element').getAttribute('_id')
    openPopup(confirmPopup)
    confirmForm.querySelector('.confirm__input').focus()
}

function confirmFormSubmit(evt) {
    evt.preventDefault()
    console.log(evt.currentTarget)
    console.log('here')
    document.querySelector(`[_id="${elementToDelete}"]`).remove();
    closePopup(confirmPopup)
    removeCard(elementToDelete)
    elementToDelete = ""
}

function likeCard(evt) {
    const target = evt.target
    const targetCard = target.closest('.element')
    const targetLikeElem = targetCard.querySelector('.element__likes')
    const _id = targetCard.getAttribute('_id')
    target.classList.toggle('element__heart_active')

    if (target.classList.contains('element__heart_active')) {
        setLike(_id).then(data => {
            console.log(data)
            targetLikeElem.textContent = data.likes.length
        }).catch(error => console.log(error))
    } else {
        deleteLike(_id).then(data => {
            targetLikeElem.textContent = data.likes.length
        }).catch(error => {
            console.log(error)
        })
    }
}

// Identification of view block
const viewItemBlock = document.querySelector('.view')
const viewTargetImage = viewItemBlock.querySelector('.view__image')
const viewTargetText = viewItemBlock.querySelector('.view__text')

function viewImage(evt, viewItemBlock) {
    openPopup(viewItemBlock)
    viewTargetImage.src = evt.target.src
    viewTargetImage.alt = evt.target.alt
    viewTargetText.textContent = evt.target.alt
}

export {
    createCard,
    deleteCard,
    likeCard
}