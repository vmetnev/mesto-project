let btn__edit = document.getElementsByClassName('profile__edit-button')[0]
let btn__submit = document.getElementsByClassName('popup__submit')[0]
let btn__cancel = document.getElementsByClassName('popup__cancel')[0]

btn__edit.addEventListener('click', editHandler)
btn__submit.addEventListener('click', submitHandler)
btn__cancel.addEventListener('click', cancelHandler)

function editHandler() {
    document.getElementsByClassName('popup')[0].style.display = "block"
    document.getElementsByClassName('overlay')[0].style.display = "block"
}

function submitHandler() {
    document.getElementsByClassName('popup')[0].style.display = "none"
    document.getElementsByClassName('overlay')[0].style.display = "none"
}

function cancelHandler() {
    document.getElementsByClassName('popup')[0].style.display = "none"
    document.getElementsByClassName('overlay')[0].style.display = "none"
}