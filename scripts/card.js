const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardInstance = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardInstance.querySelector('.element__image')
    cardInstance.querySelector('.element__text').textContent = name
    cardImage.src = link
    cardImage.alt = name
    cardImage.addEventListener('click', viewImage)
    cardInstance.querySelector('.element__delete').addEventListener('click', deleteCard)
    cardInstance.querySelector('.element__heart').addEventListener('click', likeCard)
    return cardInstance
}

function deleteCard(evt) {
    console.log(evt.target)
    evt.target.closest('.element').remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('element__heart_active')
}

function viewImage(evt) {
    openPopup(viewItemBlock)
    viewTargetImage.src = evt.target.src
    viewTargetImage.alt = evt.target.alt
    viewTargetText.textContent = evt.target.alt
}

export {
    initialCards,
    createCard,
    deleteCard,
    likeCard
}