export default class FormValidator {
	constructor(config, form) {
		this._form = form;
		this._formSelector = config.formSelector;
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;

		this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
		this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);


	}

	// Вывод ошибки
	_showValidationError(input, validationMessage) {
		const errorSpan = this._form.querySelector(`.${input.id}-error`);
		input.classList.add(this._inputErrorClass);
		errorSpan.classList.add(this._errorClass);
		errorSpan.textContent = validationMessage;
	}

	// Скрытие ошибки
	_hideValidationError(input) {
		const errorSpan = this._form.querySelector(`.${input.id}-error`);
		input.classList.remove(this._inputErrorClass);
		errorSpan.textContent = "";
		errorSpan.classList.remove(this._errorClass);
	}

	// Действия при проверке валидности
	_handleInputValidity(input) {
		if (!input.validity.valid) {
			const errorMessage = input.validationMessage;
			this._showValidationError(input, errorMessage);
		} else {
			this._hideValidationError(input);
		}
	}

	// Проверка валидности
	_validateInputs(inputList) {
		return inputList.some((input) => {
			return !input.validity.valid;
		});
	}

	// Переключение состояния кнопки отправки
	_toggleSubmitButton() {
		if (this._validateInputs(this._inputList)) {
			this._buttonSubmit.classList.add(this._inactiveButtonClass);
			this._buttonSubmit.disabled = true;
		} else {
			this._buttonSubmit.classList.remove(this._inactiveButtonClass);
			this._buttonSubmit.disabled = false;
		}
	}

	// Включение валидации
	enableValidation() {
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._handleInputValidity(inputElement);
				this._toggleSubmitButton();
			});
		});
		this._toggleSubmitButton();
	}

	// Сброс ошибок 
	cleanErrorForm() {
		this._inputList.forEach((input) => {
			this._hideValidationError(input);
		});
		this._toggleSubmitButton();
	}
}
