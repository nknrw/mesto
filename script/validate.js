const showValidationError = (form, input, error) => {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    input.classList.add('popup__input_invalid');
    errorSpan.textContent = error;
    errorSpan.classList.add("popup__input-error_active");
};

const hideValidationError = (form, input) => {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    input.classList.remove('popup__input_invalid');
    errorSpan.classList.remove("popup__input-error_active");
    errorSpan.textContent = "";
};

const handleInputValidity = (form, input) => {
    if (!input.validity.valid) {
        showValidationError(form, input, input.validationMessage);
    } else {
        hideValidationError(form, input);
    }
};

const setEventListeners = (form) => {
    const inputs = Array.from(form.querySelectorAll(".popup__input"));
    const buttonSubmit = form.querySelector(".popup__submit-button");
    toggleSubmitButton(inputs, buttonSubmit);
    inputs.forEach((input) => {
        input.addEventListener("input", function () {
            handleInputValidity(form, input);
            toggleSubmitButton(inputs, buttonSubmit);
        });
    });
};

const enableValidation = () => {
    const forms = Array.from(document.querySelectorAll(".popup__form"));
    forms.forEach((form) => {
        setEventListeners(form);
    });
};


function validateInputs(inputs) {
    return inputs.some((input) => {
        return !input.validity.valid;
    });
}

function toggleSubmitButton(inputs, buttonSubmit) {
    if (validateInputs(inputs)) {
        buttonSubmit.classList.add("popup__submit-button_disabled");
    } else {
        buttonSubmit.classList.remove("popup__submit-button_disabled");
    }
}

enableValidation();

//   enableValidation({
//     formSelector: "popup__form",
//     inputSelector: "popup__input",
//     submitButtonSelector: "popup__submit-button",
//     inactiveButtonClass: "popup__submit-button_disabled",
//     inputErrorClass: "form__input-error",
//     errorClass: "form__input-error_active",
//   });