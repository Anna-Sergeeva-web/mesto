let overlay = document.querySelector('.overlay');
let editButton = document.querySelector('.button_type_edit');
let closeButton = overlay.querySelector('.button_type_close');

let openForm = () => {
   overlay.classList.add('overlay_type_opened');
  }
editButton.addEventListener('click', openForm); 

let closeForm = () => {
   overlay.classList.remove('overlay_type_opened');
  }
closeButton.addEventListener('click', closeForm); 

