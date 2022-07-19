export default class UserInfo {
	constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
		this._userName = document.querySelector(userNameSelector);
		this._userAbout = document.querySelector(userInfoSelector);
		this._userAvatar = document.querySelector(userAvatarSelector);
		// console.log(`"${userAvatarSelector}"`);
	}
	//getUserInfo`, который возвращает объект с данными пользователя.
	getUserInfo() {
		return {
			name: this._userName.textContent,
			about: this._userAbout.textContent,
			avatar: this._userAvatar.src,
			// userAvatar: this._userAvatar,
			_id: this._id,
		};
	}
	// setUserInfo({ userName, userAbout, userAvatar, _id }) {
	setUserInfo({ name, about, avatar, _id }) {
		this._userName.textContent = name;
		this._userAbout.textContent = about;
		this._userAvatar.src = avatar;
		// this._userAvatar = avatar;
		this._id = _id;
	}

	getUserId() {
		return this._id;
	}
}
// добавить селектор аватара пользователя в getUserInfo SetUserInfo
// и getUserId
// getUserId() {
// 	return this._userId;
// }
