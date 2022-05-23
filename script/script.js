const popupProfile = document.querySelector('.popup_profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const formProfile = popupProfile.querySelector('.popup__container');
const closeProfilePopupButton = popupProfile.querySelector('.popup__close-button');

const popupCard = document.querySelector('.popup_card');
const addCardButton = document.querySelector('.profile__add-button');
const formCard = popupCard.querySelector('.popup__container');
const closeCardPopupButton = popupCard.querySelector('.popup__close-button');

const popupFullscreen = document.querySelector('.popup_fullscreen');
const closeImagePopupButton = popupFullscreen.querySelector('.popup__close-button');
const popupImage = popupFullscreen.querySelector('.popup__image');
const popupImageFigure = popupFullscreen.querySelector('.popup__figure');
const popupImageCaption = popupFullscreen.querySelector('.popup__caption');

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_about');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__about');

let cardTitleInput = popupCard.querySelector('.popup__input_title');
let cardLinkInput = popupCard.querySelector('.popup__input_link');

const cardContainer = document.querySelector('.elements');

const initialCards = [
    {
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
    const card = addCard(item);
    renderCard(card);
});

function renderCard(card) {
    cardContainer.prepend(card);
}

function addCard(item) {
    const name = item.name;
    const link = item.link;
    const template = document.querySelector('.elements__template').content;
    const cardTemplate = template.querySelector('.elements__card').cloneNode(true);
    const cardName = cardTemplate.querySelector('.elements__title');
    const cardImage = cardTemplate.querySelector('.elements__image');
    const removeCardButton = cardTemplate.querySelector('.elements__trash-button');
    const likeCardButton = cardTemplate.querySelector('.elements__like-button');

    likeCardButton.addEventListener('click', likeCard);
    removeCardButton.addEventListener('click', removeCard);
    cardImage.addEventListener('click', renderImagePopup);

    cardName.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    return cardTemplate;
}

function openPopup(popup) {
    popup.classList.add('popup_active');
}

function closePopup(popup) {
    popup.classList.remove('popup_active')
}

function profileEditor() {
    openPopup(popupProfile);
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}

function formSubmitProfile (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupProfile);
}

function formSubmitCard(evt) {
    evt.preventDefault();
    const card = addCard({link: cardLinkInput.value, name: cardTitleInput.value,});
    renderCard(card);
    cardContainer.prepend(card);
    closePopup(popupCard);
    evt.target.reset();
}

function removeCard(evt) {
    evt.target.closest('.elements__card').remove();
}

function likeCard(evt) {
    evt.target.classList.toggle("elements__like-button_active");
}

function renderImagePopup(evt) {
    openPopup(popupFullscreen);
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = evt.target.alt;
    popupImage.alt = evt.target.alt;
}

editProfileButton.addEventListener('click', profileEditor);
formProfile.addEventListener('submit', formSubmitProfile); 
closeProfilePopupButton.addEventListener('click', () => closePopup(popupProfile));

addCardButton.addEventListener('click', () => openPopup(popupCard));
formCard.addEventListener('submit', formSubmitCard); 
closeCardPopupButton.addEventListener('click', () => closePopup(popupCard));

closeImagePopupButton.addEventListener('click', () => closePopup(popupFullscreen))
