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