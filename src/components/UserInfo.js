export default class UserInfo {
	constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
		this._userName = document.querySelector(userNameSelector);
		this._userAbout = document.querySelector(userInfoSelector);
		this._userAvatar = document.querySelector(userAvatarSelector);
	}

	// Получение данных пользователя
	getUserInfo() {
		return {
			name: this._userName.textContent,
			about: this._userAbout.textContent,
			avatar: this._userAvatar.src,
			_id: this._id,
		};
	}

	// Изменение данных пользователя
	editUserInfo({ name, about, avatar, _id }) {
		this._userName.textContent = name;
		this._userAbout.textContent = about;
		this._userAvatar.src = avatar;
		this._id = _id;
	}

	getUserId() {
		return this._id;
	}
}
