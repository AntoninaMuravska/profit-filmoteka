const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modal: document.querySelector('#modal-movie__description'),
  closeModalBtn: document.querySelector('[data-action="modal-movie__close"]'),
  backdrop: document.querySelector('.modal-movie__backdrop'),
  addToWatchedBtn: document.querySelector('button[data-name="watched"]'),
  addToQueueBtn: document.querySelector('button[data-name="queue"]'),
};

refs.galleryList.addEventListener('click', onMovieCardClick);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onMovieCardClick(event) {
  event.preventDefault();

  const isMovieCard = event.target.classList.contains('js-gallery-item');
  if (!isMovieCard) {
    return;
  }

  onOpenModal(event.target.dataset.id);
}

function onOpenModal() {
  refs.modal.classList.remove('is-hidden');

  refs.addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
  refs.addToQueueBtn.addEventListener('click', onAddToQueueClick);
}

function onCloseModal() {
  refs.modal.classList.add('is-hidden');
  refs.backdrop.removeEventListener('click', onBackdropClick);
  window.removeEventListener('keydown', onEscKeyPress);
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    window.addEventListener('keydown', onEscKeyPress);
    onCloseModal();
  }
}
