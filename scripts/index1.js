let formElement = overlay.querySelector('.popup-input');
let profileElement = document.querySelector('.profile');
let nameInput = formElement.querySelector('.popup-input__text-name');
let jobInput = formElement.querySelector('.popup-input__text-occupation');
let profileName = profileElement.querySelector('.profile__name');
let profileOccupation = profileElement.querySelector('.profile__occupation');


function handleFormSubmit (evt) {
   evt.preventDefault();

   profileName.textContent = nameInput.value
   profileOccupation.textContent = jobInput.value

   let closeForm = () => {
      overlay.classList.remove('overlay_type_opened');
     }
   formElement.addEventListener('submit', closeForm);  
}

formElement.addEventListener('submit', handleFormSubmit);
