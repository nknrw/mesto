export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	rendererItems() {
		this._items.forEach(this._renderer);
	}

	addItem(item) {
		// добавляет элемент в контейнер
		this._container.prepend(item);
	}
}