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


const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach((item) => {
  let cardInstance = cardTemplate.querySelector('.element').cloneNode(true);
  cardInstance.querySelector('.element__text').textContent = item.name
  cardInstance.querySelector('.element__image').src = item.link
  cardInstance.querySelector('.element__image').alt = item.name
  cardInstance.querySelector('.element__image').addEventListener('click', viewImage)
  cardInstance.querySelector('.element__delete').addEventListener('click', deleteCard)
  cardInstance.querySelector('.element__heart').addEventListener('click', likeCard)
  document.querySelector('.elements').appendChild(cardInstance)
})