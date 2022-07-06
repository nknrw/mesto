export default class Card {
	constructor({ name, link }, templateSelector, handleCardClick) {
		this._name = name;
		this._link = link;
		this._template = templateSelector;
		this._handleCardClick = handleCardClick;
	}
	// Получение шаблона карточки
	_getTemplate() {
		const cardElement = document
			.querySelector(this._template)
			.content.querySelector(".elements__card")
			.cloneNode(true);
		return cardElement;
	}
	// Лайк карточки
	_handleElementLikeBtn() {
		this._cardLikeButton.classList.toggle("elements__like-button_active");
	}

	// Удаление карточки
	_handleElementDeleteBtn() {
		this._element.remove();
		this._element = null;
	}
	// Установка слушателей
	_setEventListeners() {
		this._cardLikeButton.addEventListener("click", (evt) => {
			evt.stopPropagation();
			this._handleElementLikeBtn();
		});
		this._cardDeleteButton.addEventListener("click", (evt) => {
			evt.stopPropagation();
			this._handleElementDeleteBtn();
		});
		this._cardImage.addEventListener("click", () => { 
			this._handleCardClick(this._name, this._link);
		});
	}
	// Отрисовка новой карточки
	generateCard() {
		this._element = this._getTemplate();
		this._cardImage = this._element.querySelector(".elements__image");
		this._cardTitle = this._element.querySelector(".elements__title");
		this._cardLikeButton = this._element.querySelector(".elements__like-button");
		this._cardDeleteButton = this._element.querySelector(".elements__trash-button");

		this._setEventListeners();

		this._cardTitle.textContent = this._name;
		this._cardImage.src = this._link;
		this._cardTitle.alt = this._name;

		return this._element;
	}
}
