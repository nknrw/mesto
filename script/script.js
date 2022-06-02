const popup = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_profile');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const formProfile = popupProfile.querySelector('.popup__form');
const buttonProfileClose = popupProfile.querySelector('.popup__close-button');

const popupCard = document.querySelector('.popup_card');
const buttonCardAdd = document.querySelector('.profile__add-button');
const formCard = popupCard.querySelector('.popup__form');
const buttonCardClose = popupCard.querySelector('.popup__close-button');

const popupFullscreen = document.querySelector('.popup_fullscreen');
const buttonImageClose = popupFullscreen.querySelector('.popup__close-button');
const popupImage = popupFullscreen.querySelector('.popup__image');
const popupImageFigure = popupFullscreen.querySelector('.popup__figure');
const popupImageCaption = popupFullscreen.querySelector('.popup__caption');

const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_about');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__about');

const cardTitleInput = popupCard.querySelector('.popup__input_title');
const cardLinkInput = popupCard.querySelector('.popup__input_link');

const cardContainer = document.querySelector('.elements');

const template = document.querySelector('.elements__template').content;

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
    const cardTemplate = template.querySelector('.elements__card').cloneNode(true);
    const cardName = cardTemplate.querySelector('.elements__title');
    const cardImage = cardTemplate.querySelector('.elements__image');
    const buttonCardRemove = cardTemplate.querySelector('.elements__trash-button');
    const buttonCardLike = cardTemplate.querySelector('.elements__like-button');

    buttonCardLike.addEventListener('click', likeCard);
    buttonCardRemove.addEventListener('click', removeCard);
    cardImage.addEventListener('click', renderImagePopup);

    cardName.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    return cardTemplate;
}

function openPopup(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', pressEsc);
    document.addEventListener('click', clickOverlay);
}

function closePopup(popup) {
    popup.classList.remove('popup_active');
}

function editProfile() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popupProfile);
}

function submitFormProfile (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupProfile);
}

function submitFormCard(evt) {
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
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = evt.target.alt;
    popupImage.alt = evt.target.alt;
    openPopup(popupFullscreen);
}

buttonProfileEdit.addEventListener('click', editProfile);
formProfile.addEventListener('submit', submitFormProfile); 
buttonProfileClose.addEventListener('click', () => closePopup(popupProfile));

buttonCardAdd.addEventListener('click', () => openPopup(popupCard));
formCard.addEventListener('submit', submitFormCard); 
buttonCardClose.addEventListener('click', () => closePopup(popupCard));

buttonImageClose.addEventListener('click', () => closePopup(popupFullscreen))

function pressEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_active');
        closePopup(popupOpened);
    };
}

function clickOverlay(evt) {
	if (evt.target.classList.contains('popup')) {
		const popupOpened = document.querySelector('.popup_active');
		closePopup(popupOpened);
	}
}