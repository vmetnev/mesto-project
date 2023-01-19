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

initialCards.forEach((item) => {
    document.querySelector('.elements').append(createCard(item.name, item.link))
})

function createCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardInstance = cardTemplate.querySelector('.element').cloneNode(true);
    cardInstance.querySelector('.element__text').textContent = name
    cardInstance.querySelector('.element__image').src = link
    cardInstance.querySelector('.element__image').alt = name
    cardInstance.querySelector('.element__image').addEventListener('click', viewImage)
    cardInstance.querySelector('.element__delete').addEventListener('click', deleteCard)
    cardInstance.querySelector('.element__heart').addEventListener('click', likeCard)
    return cardInstance
}

// Setting close
document.querySelectorAll('.popup__close').forEach((item) => {
    item.addEventListener('click', closePopup)
})

// Identification of elements blocks for adding new cards
const cartHolder = document.querySelector('.elements')

// Identification of new item block
const addBlock = document.querySelector('.new-item')
const addForm = addBlock.querySelector('.new-item__form')
addBlock.querySelector('.new-item__submit').addEventListener('click', submitNewCard)

// Identification of view block
const viewItemBlock = document.querySelector('.view')

// Identification of profile block
const profileBlock = document.querySelector('.profile')
const editProfileBtn = profileBlock.querySelector('.profile__edit-button')
const addItemBtn = profileBlock.querySelector('.profile__add-button')

const editProfileBlock = document.querySelector('.edit')
editProfileBlock.querySelector('.edit__submit').addEventListener('click', submitProfile)
const editForm = editProfileBlock.querySelector('.edit__form')
let formName = editProfileBlock.querySelector('input[name="form-name"]')
let formProfession = editProfileBlock.querySelector('input[name="form-profession"]')

editProfileBtn.addEventListener('click', () => {
    openPopup(editProfileBlock)
})

addItemBtn.addEventListener('click', () => {
    openPopup(addBlock)
})

function openPopup(target) {
    target.classList.add('popup_opened')   

    if (target.classList.contains('edit')) {        
        formName.value = profileBlock.querySelector('.profile__title').textContent
        formProfession.value = profileBlock.querySelector('.profile__text').textContent
    }
}

function closePopup(evt) {
    let elementToClose = ""
    if (evt.target) {
        elementToClose = evt.target.closest('.popup')
    } else {
        elementToClose = evt
    }
  
    elementToClose.classList.remove('popup_opened')
    addForm.reset()
    editForm.reset() 

}

function submitProfile(evt) {
    evt.preventDefault()
    document.querySelector('.profile__title').textContent = editProfileBlock.querySelector('input[name="form-name"]').value
    document.querySelector('.profile__text').textContent = editProfileBlock.querySelector('input[name="form-profession"]').value
    closePopup(evt)
}

function submitNewCard(evt) {
    evt.preventDefault()
    const nameInput = addBlock.querySelector('input[name="item-text"]')
    const linkInput = addBlock.querySelector('input[name="item-link"]')

    let newText = nameInput.value
    let newImageLink = linkInput.value
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
    }
}

function viewImage(evt) {
    openPopup(viewItemBlock)
    console.log(evt.target.alt)
    console.log(evt.target.src)
    const targetImage = viewItemBlock.querySelector('.view__image')
    targetImage.src = evt.target.src
    targetImage.alt = evt.target.alt
    viewItemBlock.querySelector('.view__text').textContent = evt.target.alt
}

function deleteCard(evt) {
    evt.target.parentElement.parentElement.remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('element__heart_active')
}