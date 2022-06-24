export default class FormValidator {
	constructor(config, form) {
		this._form = form;
		this._formSelector = config.formSelector;
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;
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
	_validateInputs(inputs) {
		return inputs.some((input) => {
			return !input.validity.valid;
		});
	}

	// Переключение состояния кнопки отправки
	_toggleSubmitButton(inputs, buttonSubmit) {
		if (this._validateInputs(inputs)) {
			buttonSubmit.classList.add(this._inactiveButtonClass);
			buttonSubmit.disabled = true;
		} else {
			buttonSubmit.classList.remove(`${this._inactiveButtonClass}`);
			buttonSubmit.disabled = false;
		}
	}

	// Включение валидации
	enableValidation() {
		const inputs = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
		const buttonSubmit = this._form.querySelector(`.${this._submitButtonSelector}`);
		inputs.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._handleInputValidity(inputElement);
				this._toggleSubmitButton(inputs, buttonSubmit);
			});
		});
		this._toggleSubmitButton(inputs, buttonSubmit);
	}

	// Сброс ошибок 
	cleanErrorForm() {
		const inputs = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
		const buttonSubmit = this._form.querySelector(`.${this._submitButtonSelector}`);
		inputs.forEach((input) => {
			this._hideValidationError(input);
		});
		this._toggleSubmitButton(inputs, buttonSubmit);
	}
}
