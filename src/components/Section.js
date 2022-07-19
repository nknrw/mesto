export default class Section {
	constructor(renderer, containerSelector) {
		// this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	rendererItems(items) {
		items.reverse().forEach((item) => {
			this._renderer(item);
		})
	}

	addItem(item) {
		// добавляет элемент в контейнер
		this._container.prepend(item);
	}
}
// export default class Section {
// 	constructor({ items, renderer }, containerSelector) {
// 		this._items = items;
// 		this._renderer = renderer;
// 		this._container = document.querySelector(containerSelector);
// 	}

// 	rendererItems() {
// 		this._items.forEach(this._renderer);
// 	}

// 	addItem(item) {
// 		// добавляет элемент в контейнер
// 		this._container.prepend(item);
// 	}
// }
