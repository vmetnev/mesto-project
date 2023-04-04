import '../pages/index.css'

import {
  Card
} from '../components/Card.js'

import {
  UserInfo
} from '../components/UserInfo'

import {
  FormValidator
} from '../components/FormValidator.js'

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__field-error_active'
};

import {
  PopupWithForm
} from '../components/PopupWithForm.js'


import {
  PopupWithImage
} from '../components/PopupWithImage.js'

const popupWithImage = new PopupWithImage('.popup__open-image')
const popupEditProfile = new PopupWithForm('.popup__edit-profile', handleProfileFormSubmit)
const popupAddCard = new PopupWithForm('.popup__add-card', handleNewPlaceFormSubmit)
const popupChangeAvatar = new PopupWithForm('.popup__avatar', handleAvatarFormSubmit)

const validatorPopupEditProfile = new FormValidator(validationSettings, popupEditProfile.form)
const validatorPopupAddCard = new FormValidator(validationSettings, popupAddCard.form)
const validatorPopupChangeAvatar = new FormValidator(validationSettings, popupChangeAvatar.form)

import Api from '../components/Api.js';

const api = new Api()

import Section from '../components/Section'

const profileFormButton = document.querySelector('.profile__edit-button');
const placeFormButton = document.querySelector('.profile__add-button');
const avatarFormButton = document.querySelector('.profile__avatar-button');

const newPromises = [api.getUserData(), api.getInitialCards()]
let userId = ""
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar', api)
let section = ""

Promise.all(newPromises)
  .then(([dataProfile, initialCards]) => {
    userId = dataProfile._id
    section = new Section({
      initialCards,
      renderer
    }, '.elements__inner')
  }).catch((err) => {
    console.log(err)
  }).finally(() => {
    console.log('started')
  })

function renderer(items) {
  console.log(this)
  items.forEach((item) => {
    const cardElement = createCard(item)
    this.addItem(cardElement) // because this appears to be a section....
  });
}

function createCard(item) {
  const card = new Card(userId, item, '.card-template', api, popupWithImage)
  const cardElement = card.generate();
  return cardElement
}

// ######################################################################################

profileFormButton.addEventListener('click', () => {
  popupEditProfile.open()
});

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data).then(data => {}).catch(error => {
    console.log(error)
  }).finally(() => {
    popupEditProfile.submitButton.textContent = "Сохранить"
    popupEditProfile.close()
    
  })
}

// ######################################################################################

placeFormButton.addEventListener('click', () => {
  popupAddCard.open();
})

function handleNewPlaceFormSubmit(data) {
  api.saveNewCard(data.name, data.link).then(resp => {
    const newCard = createCard(resp)
    section.addItem(newCard)
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    popupAddCard.submitButton.textContent = "Сохранить"
    popupAddCard.close()
  })
}

// ######################################################################################

avatarFormButton.addEventListener('click', () => {
  popupChangeAvatar.open();
})

function handleAvatarFormSubmit(data) {
  userInfo.setAvatar(data.link).then(resp => {}).catch(error => {
    console.log(error)
  }).finally(() => {
    popupChangeAvatar.submitButton.textContent = "Сохранить"
    popupChangeAvatar.close();
  })
}

// ######################################################################################