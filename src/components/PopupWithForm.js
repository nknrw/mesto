import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSumit, handleFormOpen) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSumit;
		this._handleFormOpen = handleFormOpen;
		this.popupForm = this._popup.querySelector('.popup__form');
		this.button = this.popupForm.querySelector('.popup__submit-button');
		this._inputList = this.popupForm.querySelectorAll('.popup__input');
	}

	// Изменение текста кнопки
	setButtonText(text) {
		this.button.textContent = text;
	}

	// Получение значений инпутов
	_getInputValues() {
		this._formValues = {};
		this._inputList.forEach((input) => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	// Открытие
	open() {
		super.open();
		this._handleFormOpen();
	}

	// Слушатели
	setEventListeners() {
		super.setEventListeners();

		this.popupForm.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues()); // передаём объект с данными формы в колбэк
			this.close();
		});
	}

	// Закрытие
	close() {
		super.close();
		this.popupForm.reset();
	}
}
