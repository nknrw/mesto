// Импорты
import { initialCards, validationConfig } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

//Определение функций
function handleUserSubmit(formDataUser) {
	userData.setUserInfo(formDataUser);
}
// определение переменных для пользователя
function handleUserOpen() {
	const userInfoNow = userData.getUserInfo();
	userNameInput.value = userInfoNow.userName;
	userAboutInput.value = userInfoNow.userAbout;
	formValidatorUser.cleanErrorForm();
}
function handleCardSubmit(item) {
	// обработчик отправки формы
	handleCardRenderer(item);
}

function handleCardOpen() {
	// обработчик открытия картинки
	formValidatorCard.cleanErrorForm();
}
// обработчик открытия картинки
function handleCardClick() {
	popupWithImage.open(this._name, this._link);
}
// 
function createCard(item) {
	const card = new Card(item, ".elements__template", handleCardClick);
	const cardElement = card.generateCard();
	return cardElement;
}

function handleCardRenderer(item) {
	const cardElement = createCard(item);
	cardList.addItem(cardElement);
}

// создаем попапыв

const popupUser = new PopupWithForm(".popup_profile", handleUserSubmit, handleUserOpen);
popupUser.setEventListeners();

const popupCard = new PopupWithForm(".popup_card", handleCardSubmit, handleCardOpen);
popupCard.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_fullscreen");
popupWithImage.setEventListeners();

// обработчик открытия картинки
const clickEditUser = document.querySelector(".profile__edit-button");
clickEditUser.addEventListener("click", () => {
	popupUser.open();
});
// обработчик открытия попапа создания карточки
const clickAddCard = document.querySelector(".profile__add-button");
clickAddCard.addEventListener("click", () => {
	popupCard.open();
});

const cardList = new Section(
	{
		items: initialCards,
		renderer: handleCardRenderer,
	},
	".elements"
);

//
const formValidatorUser = new FormValidator(validationConfig, popupUser.popupForm);
formValidatorUser.enableValidation();

const formValidatorCard = new FormValidator(validationConfig, popupCard.popupForm);
formValidatorCard.enableValidation();

const userData = new UserInfo({
	userNameSelector: ".profile__name",

	userInfoSelector: ".profile__about",
});

const userNameInput = document.querySelector(".popup__input_name");

const userAboutInput = document.querySelector(".popup__input_about");

cardList.rendererItems();
