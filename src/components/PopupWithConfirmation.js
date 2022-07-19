import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this.popupForm = this._popup.querySelector('.popup__form');
		this.button = this.popupForm.querySelector('.popup__submit-button');
	}

	setButtonText(text) {
		this.button.textContent = text;
	}

	open() {
		super.open();
	}

	setDeleteCard(card, id) {
		this.cardForDelete = card;
		this.idForDelete = id;
	}

	setEventListeners() {
		super.setEventListeners();

		this.popupForm.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this.cardForDelete, this.idForDelete);
			this.setDeleteCard(null, '');
		});
	}

	close() {
		super.close();
		this.popupForm.reset();
	}
}
//
// setEventListeners() {
// 	super.setEventListeners();
// 	this._popup.addEventListener("click", (evt) => {
// 		if (evt.target.classList.contains("popup__button")) {
// 			this.close();
// 		}
// 	});
// }
