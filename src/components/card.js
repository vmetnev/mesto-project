import {
    openPopup,
    closePopup,
    hideClosestPopup
} from "./modal.js"


import {
    setLike,
    deleteLike,
    addCard
} from "./api.js"

function createCard(cardTemplate, id, name, link, likes, ownership = "server") {
    const cardInstance = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardInstance.querySelector('.element__image')
    const trashBox = cardInstance.querySelector('.element__delete')

    cardInstance.setAttribute('_id', id)
    cardInstance.querySelector('.element__text').textContent = name
    cardInstance.querySelector('.element__likes').textContent = likes
    
    ownership == "server" ? trashBox.style.visibility = "hidden" : trashBox.style.visibility = "visible"

    console.log(link)


    cardImage.src = link
    cardImage.alt = name
    cardImage.addEventListener('click', (evt) => {
        viewImage(evt, document.querySelector('.view'))
    })
    cardInstance.querySelector('.element__delete').addEventListener('click', deleteCard)
    cardInstance.querySelector('.element__heart').addEventListener('click', likeCard)
    return cardInstance
}

function deleteCard(evt) {
    evt.target.closest('.element').remove();
}

function likeCard(evt) {
    const target = evt.target
    const targetCard = target.closest('.element')
    const targetLikeElem = targetCard.querySelector('.element__likes')
    const _id = targetCard.getAttribute('_id')
    target.classList.toggle('element__heart_active')

    if (target.classList.contains('element__heart_active')) {
        setLike(_id).then(data => {
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