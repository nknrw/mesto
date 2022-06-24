// Переменная попапа с открытой картинкой
export const popupFullscreen = document.querySelector(".popup_fullscreen");

// Функция открытия любого попапа
export function openPopup(popups) {
	popups.classList.add("popup_active");
	document.addEventListener("keydown", pressEsc);
}

// Функция закрытия любого попапа
export function closePopup(popups) {
	popups.classList.remove("popup_active");
	document.removeEventListener("keydown", pressEsc);
}

// Закрытие попапа на Esc
export function pressEsc(evt) {
	if (evt.key === "Escape") {
		const popupOpened = document.querySelector(".popup_active");
		closePopup(popupOpened);
	}
}


