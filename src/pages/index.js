// Импорты
import './index.css';
// import { popupCard, popupUser, popupAvatar, validationConfig } from "../utils/constants.js";
import { validationConfig } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
// console.log();
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
//

const popupUser = new PopupWithForm('.popup_profile', handleUserSubmit, handleUserOpen);
const popupCard = new PopupWithForm('.popup_card', handleCardSubmit, handleCardOpen);
const popupDelete = new PopupWithConfirmation('.popup_delete', handleCardDelete);
const popupAvatar = new PopupWithForm('.popup_avatar', handleAvatarSubmit, handleAvatarOpen);
const popupWithImage = new PopupWithImage('.popup_fullscreen');

const clickEditUser = document.querySelector('.profile__edit-button');
const clickAddCard = document.querySelector('.profile__add-button');
const clickEditAvatar = document.querySelector('.profile__avatar-button');

const formValidatorUser = new FormValidator(validationConfig, popupUser.popupForm);
const formValidatorCard = new FormValidator(validationConfig, popupCard.popupForm);
const formValidatorAvatar = new FormValidator(validationConfig, popupAvatar.popupForm);
//
const userNameInput = document.querySelector('.popup__input_name');
const userAboutInput = document.querySelector('.popup__input_about');

// обработчик открытия картинки
// clickEditUser.addEventListener("click", () => {
// 	popupUser.open();
// });
//
// обработчик открытия попапа создания карточки
// clickAddCard.addEventListener("click", () => {
// 	popupCard.open();
// });

// !!! новый с аватаром новый userInfo
const userData = new UserInfo({
	userNameSelector: '.profile__name',
	userInfoSelector: '.profile__about',
	// добавляется аватар
	userAvatarSelector: '.profile__avatar',
});
//
// апи для получения данных
const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
	headers: {
		authorization: '62ebdfd5-7936-4ed6-b3c0-2901452931d5',
		'Content-Type': 'application/json',
	},
});

//Код скрипта промисы
//
Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then(([info, initialCards]) => {
		userData.setUserInfo(info);
		cardList.rendererItems(initialCards);
		console.log('Data loaded');
	})
	.catch((err) => console.log(err));

//Определение функций
// function handleUserSubmit(formDataUser) {
// 	// обработчик отправки формы
// 	userData.setUserInfo(formDataUser); // обновляем данные пользователя
// }

// // Создание секции для карточек
const cardList = new Section(handleCardRenderer, '.elements');

// // Функция открытия попапа пользователя
function handleUserOpen() {
	const userInfoNow = userData.getUserInfo(); // получаем данные пользователя
	userNameInput.value = userInfoNow.name; // заполняем поля данными
	userAboutInput.value = userInfoNow.about; // заполняем поля данными
	// console.dir(userInfoNow); // выводим данные пользователя
	formValidatorUser.cleanErrorForm();
}
// // Функция отправки данных пользователя
function handleUserSubmit(dataUser) {
	this.setButtonText('Сохранение...');
	console.log(dataUser); // выводим данные пользователя
	api
		.setUserInfo(dataUser)
		.then((res) => {
			userData.setUserInfo(res);
			popupUser.close();
		})
		.catch((err) => console.log(err))
		.finally(() => this.setButtonText('Сохранить'));
}
//
//
// function handleUserSubmit(formDataUser) {
// 	this.setButtonText('Сохранение...');
// 	api
// 		.setUserInfo(formDataUser)
// 		.then((res) => {
// 			userData.setUserInfo(res);
// 			popupUser.close();
// 		})
// 		.catch((err) => console.log(err))
// 		.finally(() => this.setButtonText('Сохранить'));
// }
// //

//  // Открытие попапа добавления карточки
function handleCardOpen() {
	// обработчик открытия картинки
	formValidatorCard.cleanErrorForm();
}

//  // Отправка данных карточки
function handleCardSubmit(item) {
	this.setButtonText('Сохранение...');
	api
		.addCard(item)
		.then((res) => {
			handleCardRenderer(res);
			popupCard.close();
		})
		.catch((err) => console.log(err))
		.finally(() => this.setButtonText('Создать'));
}

// Открытие попапа с картинкой
function handleCardClick(name, link) {
	popupWithImage.open(name, link);
}
//
// Обновление лайков
function handleCardLike(card, id) {
	const method = card.checkOwnerLike() ? 'DELETE' : 'PUT';
	api
		.likeCard(id, method)
		.then((res) => {
			card.renderLike(res.likes);
		})
		.catch((err) => console.log(err));
}
// создание карточки
// function createCard(item) {
// 	const card = new Card(item, ".elements__template", handleCardClick);
// 	const cardElement = card.generateCard();
// 	return cardElement;
// }
// новый код createCard
function createCard(item) {
	const card = new Card(
		{
			name: item.name,
			link: item.link,
			likes: item.likes,
			id: item._id,
			ownerId: item.owner._id,
			userId: userData.getUserId(),
		},
		'.elements__template',
		() => handleCardClick(item.name, item.link),
		() => handleCardLike(card, item._id),
		() => handleDeleteLike(card, item._id)
	);
	// console.dir(userData);
	const cardElement = card.generateCard();
	return cardElement;
}
// Функция рендеринга карточек
function handleCardRenderer(item) {
	const cardElement = createCard(item);
	cardList.addItem(cardElement);
}
// Функция удаления
function handleDeleteLike(card, id) {
	popupDelete.setDeleteCard(card, id);
	popupDelete.open();
}

//
function handleCardDelete(cardForDelete, idForDelete) {
	popupDelete.setButtonText('Удаление...');
	api
		.deleteCard(idForDelete)
		.then((res) => {
			cardForDelete.deleteCard();
			popupDelete.close();
		})
		.catch((err) => console.log(err))
		.finally(() => popupDelete.setButtonText('Да'));
}
//
// Функция открытия попапа аватара
function handleAvatarOpen() {
	// обработчик открытия
	formValidatorAvatar.cleanErrorForm();
}
//
// Функция отправки данных аватара

function handleAvatarSubmit(avatar) {
	this.setButtonText('Сохранение...');
	api
		.editAvatar(avatar)
		.then((res) => {
			userData.setUserInfo(res);
			popupAvatar.close();
		})
		.catch((err) => console.log(err))
		.finally(() => this.setButtonText('Сохранить'));
}

// слушатели

formValidatorUser.enableValidation();
formValidatorCard.enableValidation();
formValidatorAvatar.enableValidation();

popupUser.setEventListeners();
popupCard.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();
popupWithImage.setEventListeners();

clickEditUser.addEventListener('click', popupUser.open.bind(popupUser));
clickAddCard.addEventListener('click', popupCard.open.bind(popupCard));
clickEditAvatar.addEventListener('click', popupAvatar.open.bind(popupAvatar));

// const popupAvatarOpen = new PopupWithForm(".popup-avatar", handleAvatarOpen, handleAvatarOpen);
// popupAvatarOpen.setEventListeners();

// function handleAvatarSubmit(avatar) {
// 	this.setButtonText("Сохранение...");
// 	api
// 		.setAvatar(avatar)
// 		.then((res) => {
// 			userData.setAvatar(res);
// 			popupAvatarOpen.close();
// 		})
// 		.catch((err) => console.log(err))
// 		.finally(() => this.setButtonText("Сохранить"));
// }

// создаем попапыв это старые попапы

// 	{
// 		items: initialCards,
// 		renderer: handleCardRenderer,
// 	},
// 	".elements"
// );

//

// cardList.rendererItems();
//
