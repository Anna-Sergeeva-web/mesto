let overlay = document.querySelector('.overlay');
let editButton = document.querySelector('.button_type_edit');
let closeButton = overlay.querySelector('.button_type_close');
let formElement = overlay.querySelector('.popup-input');
let profileElement = document.querySelector('.profile');
let nameInput = formElement.querySelector('.popup-input__text_type_name');
let jobInput = formElement.querySelector('.popup-input__text_type_occupation');
let profileName = profileElement.querySelector('.profile__name');
let profileOccupation = profileElement.querySelector('.profile__occupation');


let openForm = () => {
   overlay.classList.add('overlay_type_opened');
   nameInput.value = profileName.textContent
   jobInput.value = profileOccupation.textContent
  }

let closeForm = () => {
   overlay.classList.remove('overlay_type_opened');
  }

let handleFormSubmit = (evt) => {
   evt.preventDefault();

   profileName.textContent = nameInput.value
   profileOccupation.textContent = jobInput.value

   closeForm();
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
formElement.addEventListener('submit', handleFormSubmit);
formElement.addEventListener('submit', closeForm);
