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
    const cardImage = cardInstance.querySelector('.element__image')
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
    enableValidation()   
}

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
        addForm.reset()
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