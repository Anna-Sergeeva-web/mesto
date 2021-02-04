  const showInputError = (formElement,inputElement,errorMessage,selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  };
  
  const hideInputError = (formElement,inputElement,selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage,selectors);
    } else {
      hideInputError(formElement, inputElement,selectors);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList,buttonElement,selectors) => {
    console.log(linkInput.value);
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(selectors.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(selectors.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };
  
  const setEventListeners = (formElement,selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    const form = document.querySelector(selectors.formSelector);
  
    toggleButtonState(inputList,buttonElement,selectors);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement,selectors);
      });
    });
  }; 
  
const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    setEventListeners(formElement, selectors);
    });
};

enableValidation(selectors = {
  formSelector: '.popup-form',
  inputSelector: '.popup-input__text',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: '.button_type_inactive',
  inputErrorClass: '.popup-input__text_type_error',
  errorClass: '.popup-input_error'
});