const config = {
    formSelector: "popup__form",
    inputSelector: "popup__input",
    submitButtonSelector: "popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__input_invalid",
    errorClass: "popup__input-error_active",
}

const showValidationError = (form, input, config) => {
    const {inputErrorClass, errorClass} = config;
    const errorSpan = form.querySelector(`.${input.id}-error`);
    input.classList.add(`${inputErrorClass}`);
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(`${errorClass}`);
};

const hideValidationError = (form, input, config) => {
    const {inputErrorClass, errorClass} = config;
    const errorSpan = form.querySelector(`.${input.id}-error`);
    input.classList.remove(`${inputErrorClass}`);
    errorSpan.classList.remove(`${errorClass}`);
    errorSpan.textContent = '';
};

function toggleSubmitButton(inputs, buttonSubmit, config) {
    const {inactiveButtonClass} = config;
    if (validateInputs(inputs)) {
        buttonSubmit.classList.add(`${inactiveButtonClass}`);
        buttonSubmit.setAttribute('disabled', '');
    } else {
        buttonSubmit.classList.remove(`${inactiveButtonClass}`);
        buttonSubmit.removeAttribute('disabled', '');
    };
};
        
function validateInputs(inputs) {
    return inputs.some((input) => {
        return !input.validity.valid;
    });
};

const handleInputValidity = (form, input, inputs, buttonSubmit, config) => {
    toggleSubmitButton(inputs, buttonSubmit, config)
    if (!input.validity.valid) {
        showValidationError(form, input, config);
    } else {
        hideValidationError(form, input, config);
    }
};

const setEventListeners = (form, config) => {
    const {inputSelector, submitButtonSelector} = config;
    const inputs = Array.from(form.querySelectorAll(`.${inputSelector}`));
    const buttonSubmit = form.querySelector(`.${submitButtonSelector}`);
    toggleSubmitButton(inputs, buttonSubmit, config);
    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            handleInputValidity(form, input, inputs, buttonSubmit, config);
            toggleSubmitButton(inputs, buttonSubmit, config);
        });
    });
};

const enableValidation = (config) => {
    const {formSelector} = config;
    const forms = Array.from(document.querySelectorAll(`.${formSelector}`));
    forms.forEach((form) => {
        setEventListeners(form, config);
    });
};

enableValidation(config);

const resetErrors = (form, config) => {
    const { inputSelector, submitButtonSelector } = config;
    const inputs = Array.from(form.querySelectorAll(`.${inputSelector}`));
    const buttonSubmit = form.querySelector(`.${submitButtonSelector}`);
    inputs.forEach((input) => {
        hideValidationError(form, input, config);
        toggleSubmitButton(inputs, buttonSubmit, config);
    });
};