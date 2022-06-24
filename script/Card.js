import { popupFullscreen, openPopup } from "./utils.js";

export default class Card {
	constructor({name, link}, template) {
		this._name = name;
		this._link = link;
		this._template = template;
	}

	// Получение шаблона карточки
	_getTemplate() {
		return document
			.querySelector(this._template)
			.content.querySelector(".elements__card")
			.cloneNode(true);
	}

	// Лайк карточки
	_handleElementLikeBtn() {
		this._element
			.querySelector(".elements__like-button")
			.classList.toggle("elements__like-button_active");
	}

	// Удаление карточки
	_handleElementDeleteBtn() {
		this._element.remove();
		this._element = null;
	}

	// Открытие картинки
	_handleImageClick() {
		popupFullscreen.querySelector(".popup__image").src = this._link;
		popupFullscreen.querySelector(".popup__image").alt = this._name;
		popupFullscreen.querySelector(".popup__caption").textContent = this._name;
		openPopup(popupFullscreen);
	}

	// Слушатели
	_setEventListeners() {
		this._element
			.querySelector(".elements__trash-button")
			.addEventListener("click", () => this._handleElementDeleteBtn());
		this._element
			.querySelector(".elements__like-button")
			.addEventListener("click", () => this._handleElementLikeBtn());
		this._element
			.querySelector(".elements__image")
			.addEventListener("click", () => this._handleImageClick());
	}

	// Отрисовка новой карточки
	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();
		this._element.querySelector(".elements__title").textContent = this._name;
		this._element.querySelector(".elements__image").src = this._link;
		this._element.querySelector(".elements__image").alt = this._name;

		return this._element;
	}
}
// export default Card;
