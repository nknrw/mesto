export default class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}
	// Возвращает объект из ответа сервера
	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}
	// получаем данные пользователя
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}
	// отправляем данные пользователя
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
	// получаем карточки
	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}
	// отправляем карточки

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
	// лайки
	likeCard(cardId, method) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
			method: method,
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}
	// передаётся объект с полем avatar
	// editAvatar(avatar) {
	// 	return fetch(`${this._baseUrl}/users/me/avatar`, {
	// 		method: "PATCH",
	// 		headers: this._headers,
	// 		body: JSON.stringify(avatar),
	// 	}).then((res) => this._getResponseData(res));
	// }
	editAvatar(avatar) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(avatar),
		}).then((res) => this._getResponseData(res));
	}
}
