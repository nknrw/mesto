export default class Section {
	constructor(renderer, containerSelector) {
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	// Отрисовка карточек
	rendererItems(items) {
		items.reverse().forEach((item) => {
			this._renderer(item);
		})
	}

	// Добавление карточки
	addItem(item) {
		this._container.prepend(item);
	}
}