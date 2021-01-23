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
const overlay = document.querySelector('.overlay');
const overlayEdit = document.querySelector('.overlay_type_edit');
const overlayAdd = document.querySelector('.overlay_type_add');
const overlayPhoto = document.querySelector('.overlay_type_photo');
const popupEdit = overlayEdit.querySelector('.popup-input_type_edit');
const popupAdd = overlayAdd.querySelector('.popup-input_type_add');
const popupPhoto = overlayPhoto.querySelector('.popup-input_type_photo');
const profileElement = document.querySelector('.profile');
const editButton = profileElement.querySelector('.button_type_edit');
const addButton = profileElement.querySelector('.button_type_add');
const closeButtonEdit = popupEdit.querySelector('.button_type_close');
const closeButtonAdd = popupAdd.querySelector('.button_type_close');
const closeButtonPhoto = popupPhoto.querySelector('.button_type_close');
const popupImage = popupPhoto.querySelector('.popup-input__image');
const popupCaption = popupPhoto.querySelector('.popup-input__caption');
const profileName = profileElement.querySelector('.profile__name');
const profileOccupation = profileElement.querySelector('.profile__occupation');
const nameInput = popupEdit.querySelector('.popup-input__text_type_name');
const jobInput = popupEdit.querySelector('.popup-input__text_type_occupation');
const createButton = popupAdd.querySelector('.button_type_save');
const placeInput = popupAdd.querySelector('.popup-input__text_type_place');
const linkInput = popupAdd.querySelector('.popup-input__text_type_link');


const render = () => {
  initialCards.forEach(renderItem);
}

const renderItem = (item) => {
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
    popupCaption.innerText = evt.target.alt;
    popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.src;
    openModal(popupPhoto);
    overlayPhoto.add('overlay_type_image');
  });
  photoGrid.prepend(htmlElement);
}

render();

function openModal(popup) {
  popup.closest('.overlay').classList.add('overlay_type_opened');
  popup.classList.add('popup-input_type_opened');
  linkInput.value = '';
  placeInput.value = '';
}

const closeModal = (popup) => {
  popup.closest('.overlay').classList.remove('overlay_type_opened');
  popup.classList.remove('popup-input_type_opened');
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  nameInput.value = '';
  jobInput.value = '';

  closeModal(popupEdit);
}


const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();

  const newCards = [
    {name: placeInput.value,
    link: linkInput.value,}];
    
    const addItem = () => {
      newCards.forEach(renderItem);
    }
    addItem();
}

editButton.addEventListener('click', function () { openModal(popupEdit); });
addButton.addEventListener('click', function () { openModal(popupAdd); });
closeButtonEdit.addEventListener('click', function () { closeModal(popupEdit); });
closeButtonAdd.addEventListener('click', function () { closeModal(popupAdd); });
closeButtonPhoto.addEventListener('click', function () { closeModal(popupPhoto); });
popupEdit.addEventListener('submit', handleFormSubmit);
createButton.addEventListener('click', handleFormSubmitAdd);
createButton.addEventListener('click', function () { closeModal(popupAdd); });
