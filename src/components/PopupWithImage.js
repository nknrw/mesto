import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = this._popup.querySelector(".popup__image");
		this._popupCaption = this._popup.querySelector(".popup__caption");
	}

	// Открытие
	open(name, link) {
		this._popupCaption.textContent = name;
		this._popupImage.src = link;
		this._popupCaption.alt = name;
		super.open();
	}
}