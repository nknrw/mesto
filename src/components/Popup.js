export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this); // привязываем контекст к методу
	}

	// Открытие
	open() {
		this._popup.classList.add("popup_active");
		document.addEventListener("keydown", this._handleEscClose);
	}

	// Закрытие
	close() {
		this._popup.classList.remove("popup_active");
		document.removeEventListener("keydown", this._handleEscClose);
	}

	// Закрытие на Esc
	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			this.close();
		}
	}

	// Слушатель, закрытие по клику на оверлей
	setEventListeners() {
		this._popup.addEventListener("mousedown", (evt) => {
			if (
				evt.target.classList.contains("popup") ||
				evt.target.classList.contains("popup__close-button")
			) {
				this.close();
			}
		});
	}
}
