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
const overlayEdit = document.querySelector('.overlay_type_edit');
const overlayAdd = document.querySelector('.overlay_type_add');
const overlayPhoto = document.querySelector('.overlay_type_photo');
const popupEditForm = overlayEdit.querySelector('.popup-input_type_edit');
const popupAddForm = overlayAdd.querySelector('.popup-input_type_add');
const popupPhoto = overlayPhoto.querySelector('.popup-input_type_photo');
const profileElement = document.querySelector('.profile');
const editButton = profileElement.querySelector('.button_type_edit');
const addButton = profileElement.querySelector('.button_type_add');
const closeButtonEdit = popupEditForm.querySelector('.button_type_close');
const closeButtonAdd = popupAddForm.querySelector('.button_type_close');
const closeButtonPhoto = popupPhoto.querySelector('.button_type_close');
const popupImage = popupPhoto.querySelector('.popup-input__image');
const popupCaption = popupPhoto.querySelector('.popup-input__caption');
const profileName = profileElement.querySelector('.profile__name');
const profileOccupation = profileElement.querySelector('.profile__occupation');
const nameInput = popupEditForm.querySelector('.popup-input__text_type_name');
const jobInput = popupEditForm.querySelector('.popup-input__text_type_occupation');
const createButton = popupAddForm.querySelector('.button_type_save');
const placeInput = popupAddForm.querySelector('.popup-input__text_type_place');
const linkInput = popupAddForm.querySelector('.popup-input__text_type_link');

const render = () => {
  initialCards.forEach(renderItem);
}

const renderItem = (item) => {
  const htmlElement = createCard(item)
  photoGrid.prepend(htmlElement);
}

const createCard = (item) => {
  const cardElement = itemTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__caption').innerText = item.name;
  card.alt = item.name;
  card.src = item.link;
  cardElement.querySelector('.button_type_heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('button_type_heart_active');
  });
  cardElement.querySelector('.button_type_delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  card.addEventListener('click', function (evt) {
    popupCaption.innerText = item.name;
    popupImage.alt = item.name;
    popupImage.src = item.link;
    openModal(overlayPhoto);
  });
  return cardElement;
}


render();

function openModal(popup) {
  popup.classList.add('overlay_type_opened');
  popup.addEventListener('click', closeOverlay);
  document.addEventListener('keydown',closeEsc);
}

const closeOverlay = (evt) => {
  const popup = document.querySelector('.overlay_type_opened');
  if (evt.target.classList.contains('overlay')) {
    closeModal(popup);
  }
}

const closeEsc = (evt) => {
  const popup = document.querySelector('.overlay_type_opened');
  if (evt.keyCode === 27) {
    closeModal(popup);
  }
}

const closeModal = (popup) => {
  popup.classList.remove('overlay_type_opened');
  document.removeEventListener('keydown', closeEsc);
  popup.removeEventListener('keydown', closeOverlay);
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  nameInput.value = '';
  jobInput.value = '';

  closeModal(overlayEdit);
}

const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();

  const newCard = 
    {name: placeInput.value,
    link: linkInput.value,};
    
    renderItem(newCard);
    closeModal(overlayAdd);
}

editButton.addEventListener('click', function () { 
  openModal(overlayEdit);
  nameInput.value = profileName.innerText;
  jobInput.value = profileOccupation.innerText;
});

addButton.addEventListener('click', function () { 
  openModal(overlayAdd);
  linkInput.value = '';
  placeInput.value = '';
});

closeButtonEdit.addEventListener('click', function () { closeModal(overlayEdit); });
closeButtonAdd.addEventListener('click', function () { closeModal(overlayAdd); });
closeButtonPhoto.addEventListener('click', function () { closeModal(overlayPhoto); });
popupEditForm.addEventListener('submit', handleFormSubmit);
popupAddForm.addEventListener('submit', handleFormSubmitAdd);
createButton.addEventListener('click', function () { closeModal(overlayAdd); });