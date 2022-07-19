import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this.popupForm = this._popup.querySelector('.popup__form');
		this.button = this.popupForm.querySelector('.popup__submit-button');
	}

	// Изменение текста кнопки
	setButtonText(text) {
		this.button.textContent = text;
	}

	// Открытие
	open() {
		super.open();
	}

	// Удаление
	setDeleteCard(card, id) {
		this.cardForDelete = card;
		this.idForDelete = id;
	}

	// Слушатели
	setEventListeners() {
		super.setEventListeners();

		this.popupForm.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this.cardForDelete, this.idForDelete);
			this.setDeleteCard(null, '');
		});
	}

	// Закрытие
	close() {
		super.close();
		this.popupForm.reset();
	}
}
