import refs from './refs';
import { makeGalleryFromLibraryItems, makeGalleryFromThrendesFilms, makeGalleryFromSearchedFilms } from './gallery';
// import { onSearch } from './search';

export const onHomeBtnClick = function (e) {
  e.preventDefault();

  const ratings = document.querySelectorAll('.rating');

  if (!refs.libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.add('visually-hidden'));
  } else {
    toggleClass(e);
  }

  refs.gallery.innerHTML = '';
  makeGalleryFromThrendesFilms(e);

  refs.headerForm.addEventListener('submit', makeGalleryFromSearchedFilms);
  refs.queueBtn.removeEventListener('click', onBtnClick);
  refs.watchedBtn.removeEventListener('click', onBtnClick);
};

export const onLibraryBtnClick = function (e) {
  e.preventDefault();

  const ratings = document.querySelectorAll('.rating');

  if (refs.libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.remove('visually-hidden'));
  } else {
    toggleClass(e);
  }

  refs.headerForm.removeEventListener('submit', makeGalleryFromSearchedFilms);
  refs.queueBtn.addEventListener('click', onBtnClick);
  refs.watchedBtn.addEventListener('click', onBtnClick);
  refs.queueBtn.click(); //иммитация нажатия кнопки queue
};

function onBtnClick(e) {
  toggleClass(e); //добавляет/удаляет классы с кнопок
  makeGalleryFromLibraryItems(e); //рендерит разметку
}

//функция добавляет/удаляет классы с кнопок
function toggleClass(e) {
  const dataName = e.currentTarget.dataset.name;

  if (dataName === 'watched') {
    refs.watchedBtn.classList.add('is_active_btn');
    refs.queueBtn.classList.remove('is_active_btn');
    return;
  } else if (dataName === 'queue') {
    refs.watchedBtn.classList.remove('is_active_btn');
    refs.queueBtn.classList.add('is_active_btn');
    return;
  }

  refs.headerBack.classList.toggle('back_library');
  refs.libraryBtn.classList.toggle('is_active');
  refs.homeBtn.classList.toggle('is_active');
  refs.headerForm.classList.toggle('is_invisible');
  refs.watchedBtn.classList.toggle('is_invisible');
  refs.queueBtn.classList.toggle('is_invisible');
  refs.headerForm.classList.toggle('visually-hidden');
}

