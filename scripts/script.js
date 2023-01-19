// ####################################################################
// ########## START-UP LOAD                           #################
// ####################################################################

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


// Identification of elements blocks for adding new cards
const cartHolder = document.querySelector('.elements')

initialCards.forEach((item) => {
    cartHolder.append(createCard(item.name, item.link))
})

function createCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardInstance = cardTemplate.querySelector('.element').cloneNode(true);
    let cardImage = cardInstance.querySelector('.element__image')
    cardInstance.querySelector('.element__text').textContent = name
    cardImage.src = link
    cardImage.alt = name
    cardImage.addEventListener('click', viewImage)
    cardInstance.querySelector('.element__delete').addEventListener('click', deleteCard)
    cardInstance.querySelector('.element__heart').addEventListener('click', likeCard)
    return cardInstance
}

// Setting close
document.querySelectorAll('.popup__close').forEach((item) => {
    item.addEventListener('click', hideClosestPopup)
})


// Identification of new item block
const addBlock = document.querySelector('.new-item')
const addForm = document.querySelector('.new-item__form')
const addFormName = addForm.querySelector('input[name="item-text"]')
const addFormLink = addForm.querySelector('input[name="item-link"]')

addForm.onsubmit = submitNewCard

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
editForm.onsubmit = submitProfile

editProfileBtn.addEventListener('click', () => {
    openPopup(editProfileBlock)
})

addItemBtn.addEventListener('click', () => {
    openPopup(addBlock)
})

function openPopup(target) {
    target.classList.add('popup_opened')
    formName.value = profileTitle.textContent
    formProfession.value = profileText.textContent
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
}

function hideClosestPopup(evt) {
    const elementToClose = evt.target.closest('.popup')
    closePopup(elementToClose)
}

function submitProfile(evt) {
    evt.preventDefault()

    if (formName.value.length === 0 || formProfession.value.length === 0) {       
        return
    }
  
    profileTitle.textContent = formName.value
    profileText.textContent = formProfession.value
    closePopup(editProfileBlock)
}

function submitNewCard(evt) {
    evt.preventDefault()

    let newText = addFormName.value
    let newImageLink = addFormLink.value
    let validationTest = true

    if (newText.split(' ').join('').length === 0) {
        validationTest = false
    }

    if (newImageLink.split(' ').join('').length === 0) {
        validationTest = false
    }

    const img = new Image()
    img.src = newImageLink

    img.onerror = () => {
        validationTest = false
    }

    if (!validationTest) return

    img.onload = () => {
        cartHolder.prepend(createCard(newText, newImageLink))
        closePopup(addBlock)
        setTimeout(function () {
            addForm.reset()
            editForm.reset()
        }, 300)
    }
}

function viewImage(evt) {
    openPopup(viewItemBlock)    
    viewTargetImage.src = evt.target.src
    viewTargetImage.alt = evt.target.alt
    viewTargetText.textContent = evt.target.alt
}

function deleteCard(evt) {
    console.log(evt.target)
    evt.target.closest('.element').remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('element__heart_active')
}