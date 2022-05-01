let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_about');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__about');

function openPopup() {
    popup.classList.toggle('popup_active');
} 

editButton.addEventListener ("click", openPopup);

function closePopup(evt) {
    evt.preventDefault();
    popup.classList.toggle('popup_active');
}

closeButton.addEventListener ("click", closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    nameProfile.textContent = nameValue;
    jobProfile.textContent = jobValue;
    closePopup(evt);
}

formElement.addEventListener('submit', formSubmitHandler); 