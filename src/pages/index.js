import './index.css';
import {validationConfig} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const userNameInput = document.querySelector('.popup__input_name');
const userAboutInput = document.querySelector('.popup__input_about');

const clickEditUser = document.querySelector('.profile__edit-button');
const clickAddCard = document.querySelector('.profile__add-button');
const clickEditAvatar = document.querySelector('.profile__avatar-button');

const popupUser = new PopupWithForm('.popup_profile', handleUserSubmit, handleUserOpen);
const popupCard = new PopupWithForm('.popup_card', handleCardSubmit, handleCardOpen);
const popupDelete = new PopupWithConfirmation('.popup_delete', handleCardDelete);
const popupAvatar = new PopupWithForm('.popup_avatar', handleAvatarSubmit, handleAvatarOpen);
const popupWithImage = new PopupWithImage('.popup_fullscreen');

const formValidatorUser = new FormValidator(validationConfig, popupUser.popupForm);
const formValidatorCard = new FormValidator(validationConfig, popupCard.popupForm);
const formValidatorAvatar = new FormValidator(validationConfig, popupAvatar.popupForm);

const cardList = new Section(handleCardRenderer, '.elements');

const userData = new UserInfo({
	userNameSelector: '.profile__name',
	userInfoSelector: '.profile__about',
	userAvatarSelector: '.profile__avatar',
});

// Авторизация
const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
	headers: {
		authorization: '62ebdfd5-7936-4ed6-b3c0-2901452931d5',
		'Content-Type': 'application/json',
	},
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then(([info, initialCards]) => {
		userData.editUserInfo(info);
		cardList.rendererItems(initialCards);
	})
	.catch((err) => console.log(err));

// Открытие редактирования профиля
function handleUserOpen() {
	const userInfoNow = userData.getUserInfo(); // получаем данные пользователя
	userNameInput.value = userInfoNow.name; // заполняем поля данными
	userAboutInput.value = userInfoNow.about; // заполняем поля данными
	formValidatorUser.cleanErrorForm();
}

// Отправка данных пользователя
function handleUserSubmit(dataUser) {
	this.setButtonText('Сохранение...');
	api
		.setUserInfo(dataUser)
		.then((res) => {
			userData.editUserInfo(res);
			popupUser.close();
		})
		.catch((err) => console.log(err))
		.finally(() => this.setButtonText('Сохранить'));
}

// Открытие добавления карточки
function handleCardOpen() {
	formValidatorCard.cleanErrorForm();
}

// Отправка карточки
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

// Открытие картинки
function handleCardClick(name, link) {
	popupWithImage.open(name, link);
}

// Лайки
function handleCardLike(card, id) {
	const method = card.checkOwnerLike() ? 'DELETE' : 'PUT';
	api
		.likeCard(id, method)
		.then((res) => {
			card.renderLike(res.likes);
		})
		.catch((err) => console.log(err));
}

// Добавление карточки
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
		() => handleDelete(card, item._id)
	);
	return card.generateCard();
}

// Отрисовка карточек
function handleCardRenderer(item) {
	const cardElement = createCard(item);
	cardList.addItem(cardElement);
}

// Удаление даления
function handleDelete(card, id) {
	popupDelete.setDeleteCard(card, id);
	popupDelete.open();
}

//
function handleCardDelete(cardForDelete, idForDelete) {
	popupDelete.setButtonText('Удаление...');
	api
		.deleteCard(idForDelete)
		.then(() => {
			cardForDelete.deleteCard();
			popupDelete.close();
		})
		.catch((err) => console.log(err))
		.finally(() => popupDelete.setButtonText('Да'));
}

// Открытие изменения аватара
function handleAvatarOpen() {
	formValidatorAvatar.cleanErrorForm();
}

// Изменение аватара
function handleAvatarSubmit(avatar) {
	this.setButtonText('Сохранение...');
	api
		.editAvatar(avatar)
		.then((res) => {
			userData.editUserInfo(res);
			popupAvatar.close();
		})
		.catch((err) => console.log(err))
		.finally(() => this.setButtonText('Сохранить'));
}

// Слушатели
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
