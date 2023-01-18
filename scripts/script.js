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
    document.querySelector('.elements').appendChild(createCard(item.name, item.link))
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

/// VIEW IMAGE

function viewImage(evt) {
    document.querySelector('.view').classList.add('view_opened')
    document.querySelector('.view').classList.remove('view_fadeout')
    document.querySelector('.view').classList.add('view_fadein')

    document.querySelector('.view__text').textContent = evt.target.alt
    document.querySelector('.view__image').src = evt.target.src
    document.querySelector('.view__close').addEventListener('click', viewClose)

    const viewImg = new Image()
    viewImg.src = evt.target.src

    function viewClose() {
        document.querySelector('.view__close').removeEventListener('click', viewClose)
        document.querySelector('.view').classList.remove('view_fadein')
        document.querySelector('.view').classList.add('view_fadeout')
        setTimeout(function () {
            document.querySelector('.view').classList.remove('view_opened')
        }, 400)
    }
}

// ####################################################################
// ########## ADD CARD                                #################
// ####################################################################

const btnAdd = document.querySelector('.profile__add-button')
btnAdd.addEventListener('click', btnAddHandler)

function btnAddHandler() {
    document.querySelector('.new-item').classList.add('new-item_opened')

    document.querySelector('.new-item').classList.remove('new-item_fadeout')
    document.querySelector('.new-item').classList.add('new-item_fadein')

    const addForm = document.querySelector('.new-item')
    addForm.querySelector('.new-item__submit').addEventListener('click', btnAddFormSubmitHandler)
    addForm.querySelector('.new-item__cancel').addEventListener('click', btnAddFormCancelHandler)

    function btnAddFormSubmitHandler(evt) {
        evt.preventDefault()

        // Validation
        const newText = addForm.querySelector('input[name="item-text"]').value
        const newImageLink = addForm.querySelector('input[name="item-link"]').value

        let validationTest = true

        if (newText.split(' ').join('').length === 0) {
            validationTest = false
            addForm.querySelector('input[name="item-text"]').value = "Название"
            document.querySelector('input[name="item-text"]').classList.add('new-item__input_animate')
            setTimeout(function () {
                document.querySelector('input[name="item-text"]').classList.remove('new-item__input_animate')
                addForm.querySelector('input[name="item-text"]').value = ""
            }, 2000)
        }

        if (newImageLink.split(' ').join('').length === 0) {
            validationTest = false
            addForm.querySelector('input[name="item-link"]').value = "Ссылка на картинку"
            document.querySelector('input[name="item-link"]').classList.add('new-item__input_animate')
            setTimeout(function () {
                document.querySelector('input[name="item-link"]').classList.remove('new-item__input_animate')
                addForm.querySelector('input[name="item-link"]').value = ""
            }, 2000)
        }

        const img = new Image()
        img.src = newImageLink

        img.onerror = () => {

            document.querySelector('input[name="item-link"]').classList.add('new-item__input_animate')
            setTimeout(function () {
                document.querySelector('input[name="item-link"]').classList.remove('new-item__input_animate')
            }, 2000)
            validationTest = false
        }

        if (!validationTest) return

        img.onload = () => {

            document.querySelector('.elements').prepend(createCard(newText, newImageLink))

            addForm.querySelector('input[name="item-text"]').value = ""
            addForm.querySelector('input[name="item-link"]').value = ""
            addForm.querySelector('.new-item__submit').removeEventListener('click', btnAddFormSubmitHandler)
            addForm.querySelector('.new-item__cancel').removeEventListener('click', btnAddFormCancelHandler)

            document.querySelector('.new-item').classList.remove('new-item_fadein')
            document.querySelector('.new-item').classList.add('new-item_fadeout')
            setTimeout(function () {
                document.querySelector('.new-item').classList.remove('new-item_opened')
            }, 900)
        }
    }

    function btnAddFormCancelHandler(evt) {
        addForm.querySelector('input[name="item-text"]').value = ""
        addForm.querySelector('input[name="item-link"]').value = ""
        document.querySelector('input[name="item-link"]').classList.remove('new-item__input_animate')
        addForm.querySelector('.new-item__submit').removeEventListener('click', btnAddFormSubmitHandler)
        addForm.querySelector('.new-item__cancel').removeEventListener('click', btnAddFormCancelHandler)

        document.querySelector('.new-item').classList.remove('new-item_fadein')
        document.querySelector('.new-item').classList.add('new-item_fadeout')
        setTimeout(function () {
            document.querySelector('.new-item').classList.remove('new-item_opened')
        }, 900)
    }
}

// ####################################################################
// ########## CARD DELETE                             #################
// ####################################################################

function deleteCard(evt) {
    evt.target.parentElement.parentElement.remove();
}

// ####################################################################
// ########## CARD LIKE                               #################
// ####################################################################

function likeCard(evt) {
    console.log('like')
    evt.target.classList.toggle('element__heart_active')
}


// ####################################################################
// ########## PROFILE EDIT                            #################
// ####################################################################

const btnEdit = document.querySelector('.profile__edit-button')
btnEdit.addEventListener('click', btnEditHandler)

function btnEditHandler() {

    document.querySelector('.popup').classList.add('popup_opened')
    document.querySelector('.popup').classList.remove('popup_fadeout')
    document.querySelector('.popup').classList.add('popup_fadein')
    const editForm = document.querySelector('.popup')

    const profileName = document.querySelector('.profile__title').textContent
    const profileProfession = document.querySelector('.profile__text').textContent

    editForm.querySelector('.popup__submit').addEventListener('click', btnFormSubmitHandler)
    editForm.querySelector('.popup__cancel').addEventListener('click', btnFormEditCancelHandler)
    editForm.querySelector('input[name="form-name"]').value = profileName
    editForm.querySelector('input[name="form-profession"]').value = profileProfession

    function btnFormSubmitHandler(evt) {
        evt.preventDefault()

        const newName = editForm.querySelector('input[name="form-name"]').value
        const newProfession = editForm.querySelector('input[name="form-profession"]').value
        document.querySelector('.profile__title').textContent = newName
        document.querySelector('.profile__text').textContent = newProfession

        editForm.querySelector('.popup__submit').removeEventListener('click', btnFormSubmitHandler)
        editForm.querySelector('.popup__cancel').removeEventListener('click', btnFormEditCancelHandler)
        console.log('here')

        document.querySelector('.popup').classList.remove('popup_fadein')
        document.querySelector('.popup').classList.add('popup_fadeout')
        setTimeout(function () {
            document.querySelector('.popup').classList.remove('popup_opened')
        }, 900)
    }

    function btnFormEditCancelHandler() {
        document.querySelector('.profile__title').textContent = profileName
        document.querySelector('.profile__text').textContent = profileProfession
        editForm.querySelector('.popup__submit').removeEventListener('click', btnFormSubmitHandler)
        editForm.querySelector('.popup__cancel').removeEventListener('click', btnFormEditCancelHandler)

        document.querySelector('.popup').classList.remove('popup_fadein')
        document.querySelector('.popup').classList.add('popup_fadeout')
        setTimeout(function () {
            document.querySelector('.popup').classList.remove('popup_opened')
        }, 900)


    }
}