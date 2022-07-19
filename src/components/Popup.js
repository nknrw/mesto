export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this); // привязываем контекст к методу
	}

	open() {
		this._popup.classList.add("popup_active");
		document.addEventListener("keydown", this._handleEscClose);
	}

	close() {
		this._popup.classList.remove("popup_active");
		document.removeEventListener("keydown", this._handleEscClose);
	}

	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			this.close();
		}
	}

	setEventListeners() {
		// this._popup.addEventListener("mousedown", (evt) => {
		this._popup.addEventListener("click", (evt) => {
			if (
				evt.target.classList.contains("popup") ||
				evt.target.classList.contains("popup__close-button")
			) {
				this.close();
			}
		});
	}
}
