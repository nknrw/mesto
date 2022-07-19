export default class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	// Проверка ответа сервера
	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	// Получаение данных пользователя
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}

	// Отправка данных пользователя
	setUserInfo({ name, about }) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				about: about,
			}),
		}).then((res) => this._getResponseData(res));
	}

	// Получение карточки
	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}

	// Добавление карточки
	addCard(item) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(item),
		}).then((res) => this._getResponseData(res));
	}

	// Удаление карточки
	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}

	// Лайки
	likeCard(cardId, method) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
			method: method,
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}
	
	// Изменение аватара
	editAvatar(avatar) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(avatar),
		}).then((res) => this._getResponseData(res));
	}
}
