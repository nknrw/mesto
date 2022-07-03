import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSumit, handleFormOpen) {
		super(popupSelector);
		this._handleFormSumit = handleFormSumit;
		this._handleFormOpen = handleFormOpen;
		this.popupForm = this._popup.querySelector(".popup__form");
		this._inputList = this.popupForm.querySelectorAll(".popup__input");
	}

	_getInputValues() {
		this._formValues = {};
		this._inputList.forEach((input) => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	open() {
		super.open();
		this._handleFormOpen();
	}
	//
	setEventListeners() {
		super.setEventListeners();

		this.popupForm.addEventListener("submit", (evt) => {
			evt.preventDefault();
			this._handleFormSumit(this._getInputValues()); // передаём объект с данными формы в колбэк
			this.close();
		});
	}
	//
	close() {
		super.close();
		this.popupForm.reset();
	}
}