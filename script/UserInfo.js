/*  ## Создайте класс `UserInfo`

Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице. Этот класс:

- Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
- Содержит публичный метод `getUserInfo`, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
- Содержит публичный метод `setUserInfo,` который принимает новые данные пользователя и добавляет их на страницу */

export default class UserInfo {
	constructor({ userNameSelector, userInfoSelector }) {
		this._userName = document.querySelector(userNameSelector);
		this._userAbout = document.querySelector(userInfoSelector);
	}
	//getUserInfo`, который возвращает объект с данными пользователя.
	getUserInfo() {
		return {
			userName: this._userName.textContent,
			userAbout: this._userAbout.textContent,
		};
	}

	setUserInfo({ userName, userAbout }) {
		this._userName.textContent = userName;
		// console.log(userName);
		this._userAbout.textContent = userAbout;
	}
}

// 	this._userInfo = {};
// 	this._userInfo.name = this.userNameSelector.textContent;
// 	this._userInfo.info = this.userInfoSelector.textContent;
// 	return this._userInfo;
// }
