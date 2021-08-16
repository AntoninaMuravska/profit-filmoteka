import refs from './refs';
// import makeGalleryFromLibraryItems from '../app';
import createMarkupHome from './gallery';

export const onHomeBtnClick = e => {
  refs.headerBack.classList.remove('back_library');
  refs.libraryBtn.classList.remove('is_active');
  refs.homeBtn.classList.add('is_active');
  refs.headerForm.classList.remove('is_invisible');
  refs.watchedBtn.classList.add('is_invisible');
  refs.queueBtn.classList.add('is_invisible');

  //убирает рейтинг на страничке home
  const ratings = document.querySelectorAll('.rating');
  if (!refs.libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.add('visually-hidden'));
  }
  refs.gallery.innerHTML = '';
  // createMarkupHome();
}

export const onLibraryBtnClick = e => {
  // refs.queueBtn.addEventListener('click', onQueueBtnClick);
  // refs.queueBtn.addEventListener('click', makeGalleryFromLibraryItems);
  // refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
  // refs.watchedBtn.addEventListener('click', makeGalleryFromLibraryItems);
  refs.headerBack.classList.add('back_library');
  refs.libraryBtn.classList.add('is_active');
  refs.homeBtn.classList.remove('is_active');
  refs.headerForm.classList.add('is_invisible');
  refs.watchedBtn.classList.remove('is_invisible');
  refs.watchedBtn.classList.remove('is_active_btn');
  refs.queueBtn.classList.remove('is_invisible');
  refs.queueBtn.classList.add('is_active_btn');
  //добавляет рейтинг на страничке библиотеки
  const ratings = document.querySelectorAll('.rating');
  if (refs.libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.remove('visually-hidden'));
  }
}

export const onQueueBtnClick = e => {
  refs.watchedBtn.classList.remove('is_active_btn');
  refs.queueBtn.classList.add('is_active_btn');
}

export const onWatchedBtnClick = e => {
  refs.watchedBtn.classList.add('is_active_btn');
  refs.queueBtn.classList.remove('is_active_btn');
  // makeGalleryFromLibraryItems();
}