
// ####################################################################
// ########## PROFILE EDIT                            #################
// ####################################################################

const btnEdit = document.querySelector('.profile__edit-button')
btnEdit.addEventListener('click', btnEditHandler)

function btnEditHandler() {

    document.querySelector('.popup').classList.add('popup_opened')
    const editForm = document.querySelector('.popup')

    let profileName = document.querySelector('.profile__title').textContent
    let profileProfession = document.querySelector('.profile__text').textContent

    editForm.querySelector('.popup__submit').addEventListener('click', btnFormSubmitHandler)
    editForm.querySelector('.popup__cancel').addEventListener('click', btnFormEditCancelHandler)
    editForm.querySelector('input[name="form-name"]').value = profileName
    editForm.querySelector('input[name="form-profession"]').value = profileProfession

    function btnFormSubmitHandler(evt) {
        evt.preventDefault()
        let newName = editForm.querySelector('input[name="form-name"]').value
        let newProfession = editForm.querySelector('input[name="form-profession"]').value
        document.querySelector('.profile__title').textContent = newName
        document.querySelector('.profile__text').textContent = newProfession
        editForm.querySelector('.popup__submit').removeEventListener('click', btnFormSubmitHandler)
        editForm.querySelector('.popup__cancel').removeEventListener('click', btnFormEditCancelHandler)
        document.querySelector('.popup').classList.remove('popup_opened')
    }

    function btnFormEditCancelHandler() {
        document.querySelector('.profile__title').textContent = profileName
        document.querySelector('.profile__text').textContent = profileProfession
        editForm.querySelector('.popup__submit').removeEventListener('click', btnFormSubmitHandler)
        editForm.querySelector('.popup__cancel').removeEventListener('click', btnFormEditCancelHandler)
        document.querySelector('.popup').classList.remove('popup_opened')
    }
}


