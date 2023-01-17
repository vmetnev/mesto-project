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
        let newText = addForm.querySelector('input[name="item-text"]').value
        let newImageLink = addForm.querySelector('input[name="item-link"]').value

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
            const cardToAddTemplate = document.querySelector('#card-template').content;
            let newCard = cardToAddTemplate.querySelector('.element').cloneNode(true);
            newCard.querySelector('.element__text').textContent = newText
            newCard.querySelector('.element__image').src = newImageLink
            newCard.querySelector('.element__image').alt = newText
            newCard.querySelector('.element__delete').addEventListener('click', deleteCard)
            newCard.querySelector('.element__heart').addEventListener('click', likeCard)

            document.querySelector('.elements').prepend(newCard)

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