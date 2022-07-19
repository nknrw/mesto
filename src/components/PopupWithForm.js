import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSumit, handleFormOpen) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSumit;
		this._handleFormOpen = handleFormOpen;
		// console.dir(this._handleFormOpen);
		this.popupForm = this._popup.querySelector('.popup__form');
		this.button = this.popupForm.querySelector('.popup__submit-button');
		this._inputList = this.popupForm.querySelectorAll('.popup__input');
	}

	setButtonText(text) {
		// метод для изменения текста кнопки
		this.button.textContent = text;
	}

	_getInputValues() {
		this._formValues = {};
		this._inputList.forEach((input) => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}
	// метод для открытия попапа
	open() {
		super.open();
		this._handleFormOpen();
	}
	// метод для добавления обработчиков событий
	setEventListeners() {
		super.setEventListeners();

		this.popupForm.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues()); // передаём объект с данными формы в колбэк
			this.close();
		});
	}
	// setEventListeners() {
	// 	super.setEventListeners();

	// 	this.popupForm.addEventListener("submit", (evt) => {
	// 		evt.preventDefault();
	// 		this._handleFormSubmit(this._getInputValues());
	// 		this.close();
	// 	});
	// }

	// метод для закрытия попапа
	close() {
		super.close();
		this.popupForm.reset();
	}
}
