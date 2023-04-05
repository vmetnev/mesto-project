import '../pages/index.css';
import { profileFormButton, placeFormButton, avatarFormButton, configApi, validationSettings } from '../utils/constants.js'
import { Api } from '../components/Api.js';
import { Section } from '../components/Section';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo';
import { FormValidator } from '../components/FormValidator.js';

const api = new Api(configApi)
const newPromises = [api.getUserData(), api.getInitialCards()];
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userAboutSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
})

const popupWithImage = new PopupWithImage('.popup__open-image');
const popupEditProfile = new PopupWithForm('.popup__edit-profile', handleProfileFormSubmit);
const popupAddCard = new PopupWithForm('.popup__add-card', handlePlaceFormSubmit);
const popupChangeAvatar = new PopupWithForm('.popup__avatar', handleAvatarFormSubmit)


const validatorPopupEditProfile = new FormValidator(validationSettings, popupEditProfile._form)
const validatorPopupAddCard = new FormValidator(validationSettings, popupAddCard._form)
const validatorPopupChangeAvatar = new FormValidator(validationSettings, popupChangeAvatar._form)

let section = ''

Promise.all(newPromises)
  .then(([dataProfile, initialCards]) => {
    const userId = dataProfile._id

    userInfo.setUserInfo({
      name: dataProfile.name,
      about: dataProfile.about,
      avatar: dataProfile.avatar,
      userId: userId
    });

    section = new Section({
      data: initialCards,
      renderer: (item) => {
        const card = createCard(item)
        const cardElement = card.generate();
        section.addItem(cardElement)
      }
    }, '.elements__inner')

    section.renderItems()
  })
  .catch((err) => {
    console.log(err)
  })



function createCard(item) {
  const cardElement = new Card({
    itemData: item,
    userId: userInfo.userId,
    api: api
  }, popupWithImage, '.card-template')
  return cardElement
}

profileFormButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo())
  popupEditProfile.open();
})

placeFormButton.addEventListener('click', () => {
  popupAddCard.open();
})

avatarFormButton.addEventListener('click', () => {
  popupChangeAvatar.open()
})


function handleProfileFormSubmit(data) {
  this.submitButton.textContent = 'Сохранение...'
  api.saveProfileData(data.name, data.about)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      this.submitButton.textContent = 'Сохранение'
    })
}

function handlePlaceFormSubmit(data) {
  this.submitButton.textContent = 'Сохранение...'
  api.saveNewCard(data.name, data.link)
    .then((data) => {
      const newCard = createCard(data)
      const newCardElement = newCard.generate();
      section.addItem(newCardElement);
      popupAddCard.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      this.submitButton.textContent = 'Сохранение'
    })
}

function handleAvatarFormSubmit(data) {
  this.submitButton.textContent = 'Сохранение...'
  api.changeAvatar(data.link)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupChangeAvatar.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      this.submitButton.textContent = 'Сохранение'
    })
}

