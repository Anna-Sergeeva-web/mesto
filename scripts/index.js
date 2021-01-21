const overlay = document.querySelector('.overlay');
const editButton = document.querySelector('.button_type_edit');
const popupEdit = overlay.querySelector('.popup-input_type_edit');
const popupAdd = overlay.querySelector('.popup-input_type_add');
const closeButton = popupEdit.querySelector('.button_type_close');
const formElement = overlay.querySelector('.popup-input');
const profileElement = document.querySelector('.profile');
const nameInput = formElement.querySelector('.popup-input__text_type_name');
const jobInput = formElement.querySelector('.popup-input__text_type_occupation');
const profileName = profileElement.querySelector('.profile__name');
const profileOccupation = profileElement.querySelector('.profile__occupation');
const addButton = profileElement.querySelector('.button_type_add');

const initialCards = [
   {
     name: 'Архыз',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
     name: 'Челябинская область',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
     name: 'Иваново',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
     name: 'Камчатка',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
     name: 'Холмогорский район',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
     name: 'Байкал',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
 ]; 
const itemTemplate = document.querySelector('.template-card').content;
const photoGrid = document.querySelector('.photo-grid');
const closeAddButton = popupAdd.querySelector('.button_type_close');
const createButton = popupAdd.querySelector('.button_type_save');
const placeInput = popupAdd.querySelector('.popup-input__text_type_place');
const linkInput = popupAdd.querySelector('.popup-input__text_type_link');
const deleteButton = itemTemplate.querySelector('.button_type_delete');
const popupPhoto = overlay.querySelector('.popup-input_type_photo');
const popupImage = popupPhoto.querySelector('.popup-input__image');
const popupCaption = popupPhoto.querySelector('.popup-input__caption');
const closePhotoButton = popupPhoto.querySelector('.button_type_close');

let render = () => {
   initialCards.forEach(renderItem);
}

let renderItem = (item) => {
   const htmlElement = itemTemplate.cloneNode(true);
   htmlElement.querySelector('.card__caption').innerText = item.name;
   htmlElement.querySelector('.card__image').alt = item.name;
   htmlElement.querySelector('.card__image').src = item.link;
   htmlElement.querySelector('.button_type_heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('button_type_heart_active');
   });
   htmlElement.querySelector('.button_type_delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
   });
   htmlElement.querySelector('.card__image').addEventListener('click', function (evt) {
    overlay.classList.add('overlay_type_opened');
    popupCaption.innerText = evt.target.alt;
    popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.src;
    popupPhoto.classList.add('popup-input_type_opened');
    overlay.querySelector('.overlay__heading').innerText = "";
   });
   photoGrid.appendChild(htmlElement);
}
  
render();


let openEditForm = () =>  {
   overlay.classList.add('overlay_type_opened');
   popupEdit.classList.add('popup-input_type_opened');
   overlay.querySelector('.overlay__heading').innerText = "Редактировать";
   nameInput.value = profileName.textContent;
   jobInput.value = profileOccupation.textContent;
}

let closeEditForm = () => {
   overlay.classList.remove('overlay_type_opened');
   popupEdit.classList.remove('popup-input_type_opened');
  }

let handleFormSubmit = (evt) => {
   evt.preventDefault();

   profileName.textContent = nameInput.value
   profileOccupation.textContent = jobInput.value

   closeEditForm();
}

let openAddForm = () => {
   overlay.classList.add('overlay_type_opened');
   popupAdd.classList.add('popup-input_type_opened');
   overlay.querySelector('.overlay__heading').innerText = "Новое место";
}

let closeAddForm = () => {
   overlay.classList.remove('overlay_type_opened');
   popupAdd.classList.remove('popup-input_type_opened');
  }

let handleFormSubmitAdd = (evt) => {
    evt.preventDefault();
    
    const addElement = itemTemplate.cloneNode(true);
    addElement.querySelector('.card__caption').textContent = placeInput.value;
    addElement.querySelector('.card__image').alt = placeInput.value;
    addElement.querySelector('.card__image').src = linkInput.value;
    addElement.querySelector('.button_type_heart').addEventListener('click', function (evt) {
      evt.target.classList.toggle('button_type_heart_active');
  });
    addElement.querySelector('.button_type_delete').addEventListener('click', function (evt) {
      evt.target.closest('.card').remove();
  });
    addElement.querySelector('.card__image').addEventListener('click', function (evt) {
      overlay.classList.add('overlay_type_opened');
      popupCaption.innerText = evt.target.alt;
      popupImage.alt = evt.target.alt;
      popupImage.src = evt.target.src;
      popupPhoto.classList.add('popup-input_type_opened');
      overlay.querySelector('.overlay__heading').innerText = "";

  });

    photoGrid.prepend(addElement);
    
    linkInput.value = '';
    placeInput.value = '';
 
    closeAddForm();
 }

 let closePhoto = () => {
  overlay.classList.remove('overlay_type_opened');
  popupPhoto.classList.remove('popup-input_type_opened');
 }

 
editButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeEditForm);
formElement.addEventListener('submit', handleFormSubmit);
formElement.addEventListener('submit', closeEditForm);
addButton.addEventListener('click', openAddForm);
closeAddButton.addEventListener('click', closeAddForm);
createButton.addEventListener('click', handleFormSubmitAdd);
closePhotoButton.addEventListener('click', closePhoto);


