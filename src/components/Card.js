export default class Card {
	constructor(
		{ name, link, likes, _id, userId, ownerId },
		cardSelector,
		handleCardClick,
		handleCardLike,
		handleDeleteClick
	) {
		this._name = name; // название карточки
		this._link = link; // ссылка на картинку
		this._id = _id; // id карточки в базе данных
		this.likes = likes; // массив лайков
		this._userId = userId; // пользователь, который последним открыл карточку
		this._ownerId = ownerId; // идентификатор пользователя, который добавил карточку
		this._cardSelector = cardSelector; // шаблон карточки
		this._handleCardClick = handleCardClick; // обработчик клика по карточке
		this._handleCardLike = handleCardLike; // обработчик клика по лайку
		this._handleDeleteClick = handleDeleteClick; // обработчик клика по удалению карточки
	}

	// Получение шаблона карточки
	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector(".elements__card")
			.cloneNode(true);
		return cardElement;
	}

	// Удаление карточки
	deleteCard() {
		this._element.remove();
		this._element = null;
	}

	// Проверка лайка владельца карточки
	checkOwnerLike() {
		return this.likes.some((like) => {
			return like._id === this._userId;
		});
	}

	// Изменение иконки лайка
	setLikeImage() {
		this._cardLikeButton.classList.toggle("elements__like-button_active", this.checkOwnerLike());
	}

	// Отрисовка лайков
	renderLike(likes) {
		this.likes = likes;
		this.setLikeNumber(this.likes.length);
		this.setLikeImage();
	}

	// Установка слушателей
	_setEventListeners() {
		this._cardLikeButton.addEventListener("click", (evt) => {
			this._handleCardLike();
		});
		this._cardDeleteButton.addEventListener("click", (evt) => {
			this._handleDeleteClick();
		});
		this._cardImage.addEventListener("click", () => {
			this._handleCardClick();
		});
	}

	// Количество лайков
	setLikeNumber(number) {
		this._likeCounter.textContent = number;
	}
	
	// Отрисовка новой карточки
	generateCard() {
		this._element = this._getTemplate(); // получаем шаблон карточки
		this._cardImage = this._element.querySelector(".elements__image"); // картинка карточки
		this._cardTitle = this._element.querySelector(".elements__title"); // название карточки
		this._cardLikeButton = this._element.querySelector(".elements__like-button"); // кнопка лайка
		this._cardDeleteButton = this._element.querySelector(".elements__trash-button"); // кнопка удаления карточки
		this._likeCounter = this._element.querySelector(".elements__like-counter"); // количество лайков
		if (this._ownerId != this._userId) {
			this._cardDeleteButton.remove(); // удаление карточки для не владельца
		}
		this._setEventListeners();
		this._cardTitle.textContent = this._name; // заполняем название карточки
		this._cardImage.src = this._link; // заполняем картинку карточки
		this._cardTitle.alt = this._name; // заполняем альт картинки
		this.setLikeNumber(this.likes.length); // заполняем количество лайков
		this.setLikeImage(); // заполняем картинку лайка

		return this._element;
	}
}