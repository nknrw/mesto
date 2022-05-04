const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_about');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__about');

function openPopup() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    popup.classList.add('popup_active');
} 

function closePopup() {
    popup.classList.remove('popup_active');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    closePopup();
}

closeButton.addEventListener ("click", closePopup);

editButton.addEventListener ("click", openPopup);

formElement.addEventListener('submit', formSubmitHandler); 
