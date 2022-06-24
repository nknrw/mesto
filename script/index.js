// Импорты
import Card from "./Card.js";
import { initialCards, validationConfig } from "./constants.js";
import FormValidator from "./FormValidator.js";

// Переменная любого попапа
const popups = document.querySelectorAll(".popup");

// Контейнер с карточками и шаблон карточки
const cardContainer = document.querySelector(".elements");
const template = document.querySelector(".elements__template").content;

// Попап редактирования кнопок и кнопки
const popupProfile = document.querySelector(".popup_profile");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const formProfile = popupProfile.querySelector(".popup__form");
const buttonSubmitProfile = formProfile.querySelector(".popup__submit-button");
const buttonProfileClose = popupProfile.querySelector(".popup__close-button");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__about");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_about");

// Попап создания карточки и кнопки
const popupCard = document.querySelector(".popup_card");
const buttonCardAdd = document.querySelector(".profile__add-button");
const formCard = popupCard.querySelector(".popup__form");
const buttonSubmitCard = formCard.querySelector(".popup__submit-button");
const buttonCardClose = popupCard.querySelector(".popup__close-button");
const cardTitleInput = popupCard.querySelector(".popup__input_title");
const cardLinkInput = popupCard.querySelector(".popup__input_link");

// Попап открытия картинки и кнопки
export const popupFullscreen = document.querySelector(".popup_fullscreen");
const buttonImageClose = popupFullscreen.querySelector(".popup__close-button");
const popupImage = popupFullscreen.querySelector(".popup__image");
const popupImageFigure = popupFullscreen.querySelector(".popup__figure");
const popupImageCaption = popupFullscreen.querySelector(".popup__caption");

const popupCardForm = popupCard.querySelector(".popup__form");

// Закрытие попапа на Esc
function pressEsc(evt) {
	if (evt.key === "Escape") {
		const popupOpened = document.querySelector(".popup_active");
		closePopup(popupOpened);
	}
}

// Закрытие попапа кликом на оверлей
popups.forEach((popup) => {
	popup.addEventListener("mousedown", (evt) => {
		if (evt.target.classList.contains("popup_active")) {
			closePopup(popup);
		}
		if (evt.target.classList.contains("popup__close")) {
			closePopup(popup);
		}
	});
});
//

// Функция открытия любого попапа
export function openPopup(popups) {
	popups.classList.add("popup_active");
	document.addEventListener("keydown", pressEsc);
}
// Функция закрытия любого попапа
function closePopup(popups) {
	popups.classList.remove("popup_active");
	document.removeEventListener("keydown", pressEsc);
}

// Функция открытия попапа редактирования профиля и подставление значений
function editProfile() {
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
	openPopup(popupProfile);
}

// Функция отправки формы редактирования профиля
function submitFormProfile(evt) {
	evt.preventDefault();
	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;
	closePopup(popupProfile);
}

// Функция отправки формы добавления карточки
function submitFormCard(evt) {
	const card = new Card(cardTitleInput.value, cardLinkInput.value, ".elements__template");
	const cardElement = card.renderCard();
	evt.preventDefault();
	renderElement(cardElement);
	closePopup(popupCard);
}

// Функия добавления новой карточки
function renderElement(card) {
	cardContainer.prepend(card);
}
//

// Добавление новой карточки
initialCards.reverse().forEach(function (item) {
	const card = new Card(item.name, item.link, ".elements__template");
	const cardElement = card.renderCard();
	renderElement(cardElement);
});

// Включение валидации
const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
	formValidators[formElement.name] = new FormValidator(validationConfig, formElement);
	formValidators[formElement.name].enableValidation();
});

// Слушатель формы редактирования профиля (валидация и сброс ошибок)
buttonProfileEdit.addEventListener("click", function () {
	formProfile.reset();

	formValidators[formProfile.name].cleanErrorForm();
	editProfile(popupProfile);
});

// Слушатель отправки формы редактирования профиля
formProfile.addEventListener("submit", submitFormProfile);

// Слушатель закрытия попапа редактирования профиля
buttonProfileClose.addEventListener("click", () => closePopup(popupProfile));

//  Слушатель формы добавления карточки (валидация и сброс ошибок)
buttonCardAdd.addEventListener("click", function () {
	formCard.reset();

	formValidators[formCard.name].cleanErrorForm();
	openPopup(popupCard);
});

// Слушатель отправки формы создания карточки
formCard.addEventListener("submit", submitFormCard);

// Слушатель закртия попапа создания карточки
buttonCardClose.addEventListener("click", () => closePopup(popupCard));

// Слушатель закрытия попапа с картинкой
buttonImageClose.addEventListener("click", () => closePopup(popupFullscreen));
